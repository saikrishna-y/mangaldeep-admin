import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma"

const getLocales = async () => {
  const results = await prisma.locales.findMany({})

  return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleLocale = await prisma.locales.findUnique({ where: { id: Number(id) } })
      if (singleLocale) {
        res.status(200).json({ data: singleLocale })
      } else {
        res.status(404).json({ error: 'Locale not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getLocales()
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
