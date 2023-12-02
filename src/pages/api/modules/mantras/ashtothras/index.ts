import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getAshtothras = async () => {
  const results = await prisma.ashtothras.findMany({
    where: {
      is_active: true
    }
  })

  if (results.length > 0) {
    const locales = await prisma.locales.findMany({
      where: {
        id: {
          in: JSON.parse(JSON.stringify(results[0]?.locales))
        }
      }
    })
    const ashtothra_details = await prisma.ashtothraDetails.findMany({
      where: {
        ashtothras_id: {
          in: JSON.parse(JSON.stringify(results[0]?.id))
        }
      }
    })
    const finalData = results.map(data => {
      const locale = locales.map(d => {
        return d
      })
      const details = ashtothra_details.map(d => {
        return d
      })

      return {
        ...data,
        locales: locale,
        ashtothra_details: details
      }
    })

    return finalData
  } else {
    return results
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleAshtothra = await prisma.ashtothras.findUnique({ where: { id: Number(id) } })
      if (singleAshtothra) {
        res.status(201).json({ data: singleAshtothra })
      } else {
        res.status(404).json({ error: 'Ashtothra not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getAshtothras()
      if (response) {
        res.status(201).json(response)
      } else {
        res.status(400)
      }
    } catch (e: any) {
      res.status(500).send(e.toString())
    }
  }
}
