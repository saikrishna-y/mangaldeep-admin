import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const deleteLiveStreaming = async (req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const liveStream = await prisma.liveStreaming.findFirst({ where: { id: req.body.id } })
    if (!liveStream) {
      return res.status(400).json({ message: 'Livestreaming not found' })
    } else {
      await prisma
        .liveStreaming
        .delete({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Livestreaming deleted successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) {
  try {
    await deleteLiveStreaming(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}