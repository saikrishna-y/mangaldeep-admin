import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const getFeedbacks = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  await prisma.feedback
    .findMany({
      include: {
        Users: true,
        Language: true,
        Location: true
      }
    })
    .then(feedbacks => {
      res
        .status(200)
        .json({ data: JSON.stringify(feedbacks, (_, value) => (typeof value === 'bigint' ? value.toString() : value)) })
    })
    .catch((err: any) => {

      return res.status(400).json(err)
    })
}

export default async function handler(req: ExtendedNextApiRequest<{}>, res: NextApiResponse) {
  const { id } = req.query as any

  if (id) {
    try {
      const singleFeedback = await prisma.feedback.findUnique({
        where: { id: parseInt(id) },
        include: {
          Users: true,
          Language: true,
          Location: true
        }
      })
      if (singleFeedback) {
        res.status(201).json({
          data: JSON.stringify(singleFeedback, (_, value) => (typeof value === 'bigint' ? value.toString() : value))
        })
      } else {
        res.status(404).json({ error: 'Feedback not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      await getFeedbacks(req, res)
    } catch (e) {
      return res.status(400).json(e)
    }
  }
}
