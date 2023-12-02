import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const deleteFeedback = async (req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const feedback = await prisma.feedback.findFirst({ where: { id: req.body.id } })
    if (!feedback) {
      return res.status(400).json({ message: 'Feedback not found' })
    } else {
      await prisma
        .feedback
        .delete({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Feedback deleted successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) {
  try {
    await deleteFeedback(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}