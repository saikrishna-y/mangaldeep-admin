import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const getFeedbackCategory = async () => {
  try {
    const result = await prisma.feedbackCategory.findMany({
      include: {
        Languages: true
      }
    })

    return result
  } catch (err) {
    return err
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const category = await prisma.feedbackCategory.findUnique({ where: { id: Number(id) } })
      if (category) {
        res.status(201).json({ data: category })
      } else {
        res.status(404).json({ error: 'Language not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const result = await getFeedbackCategory()
      res.status(201).json(result)
    } catch (err: any) {
      res.status(500).send(err)
    }
  }
}
