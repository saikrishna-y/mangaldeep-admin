import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const getGeetCategory = async () => {
  try {
    const result = await prisma.mangaldeepGeetCategory.findMany({
      include: {
        Languages: true
      }
    })

    return result
  } catch (err) {
    return err
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (id) {
    try {
      const singleMangaldeepGeetCategory = await prisma.mangaldeepGeetCategory.findUnique({
        where: { id: Number(id) }
      })
      if (singleMangaldeepGeetCategory) {
        res.status(201).json({ data: singleMangaldeepGeetCategory })
      } else {
        res.status(404).json({ error: 'Mangaldeep Geet Category not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const result = await getGeetCategory()

      res.status(201).json(result)
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  }
}

export default handler
