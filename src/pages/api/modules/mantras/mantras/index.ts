import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getMantras = async () => {
  const results = await prisma.mantras.findMany({
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
    const finalData = results.map(data => {
      const locale = locales.map(d => {
        return d
      })

      return {
        ...data,
        locales: locale
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
      const singleMantra = await prisma.mantras.findUnique({ where: { id: Number(id) } })
      if (singleMantra) {
        res.status(201).json({ data: singleMantra })
      } else {
        res.status(404).json({ error: 'Mantra not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getMantras()
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
