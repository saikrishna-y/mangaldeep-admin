import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'src/utlis/prisma'

const getCountry = async () => {
  const results = await prisma.country.findMany()

  return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleCountry = await prisma.country.findUnique({ where: { id: Number(id) } })
      if (singleCountry) {
        res.status(201).json({ data: singleCountry })
      } else {
        res.status(404).json({ error: 'Country not found' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getCountry()
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
