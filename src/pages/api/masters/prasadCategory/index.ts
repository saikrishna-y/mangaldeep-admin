import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const getPrasadCategory = async () => {
  try {
    const result = await prisma.prasadCategory.findMany({
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
      const singlePrasadCategory = await prisma.prasadCategory.findUnique({ where: { id: Number(id) }, include: { Languages: true } })
      if (singlePrasadCategory) {
        res.status(200).json({ data: singlePrasadCategory })
      } else {
        res.status(404).json({ error: 'Prasad category not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const result = await getPrasadCategory()
      res.status(201).json(result)
    } catch (err: any) {
      res.status(500).send(err)
    }
  }
}

export default handler
