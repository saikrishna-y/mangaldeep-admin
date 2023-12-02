import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

// const prisma = new PrismaClient()

const getlanguages = async () => {
  const results = await prisma.languages.findMany()

  return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleLanguage = await prisma.languages.findUnique({ where: { id: Number(id) } })
      if (singleLanguage) {
        res.status(201).json({ data: singleLanguage })
      } else {
        res.status(404).json({ error: 'Language not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getlanguages()
      if (response) {
        res.status(201).json(response)
      } else {
        res.status(400)
      }
    } catch (e: any) {
      res.status(500).send(e)
    }
  }
}
