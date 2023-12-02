import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const deleteEvent = async (req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const event = await prisma.events.findFirst({ where: { id: req.body.id } })
    if (!event) {
      return res.status(400).json({ message: 'Event not found' })
    } else {
      await prisma
        .events
        .delete({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Event deleted successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) {
  try {
    await deleteEvent(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}