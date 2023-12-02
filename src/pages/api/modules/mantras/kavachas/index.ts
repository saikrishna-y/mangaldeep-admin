import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getKavachas = async () => {
  const results = await prisma.kavachas.findMany({
    where: {
      is_active: true
    },
    include: {
      Deities: true,
      Images: true
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
    return results || false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleKavacha = await prisma.kavachas.findUnique({ where: { id: Number(id) } })
      if (singleKavacha) {
        res.status(201).json({ data: singleKavacha })
      } else {
        res.status(404).json({ error: 'Kavacha not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getKavachas()
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
