import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface liveSreamingAttributes {
  id: number
  name: string
  is_video: boolean
  display_order: number
  is_android: boolean
  is_ios: boolean
  duration: string
  image_url: string
  date: string
  locales: []
  is_active: boolean
}

const editLiveStreaming = async (req: ExtendedNextApiRequest<liveSreamingAttributes>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const liveStream = await prisma.liveStreaming.findFirst({ where: { id: req.body.id } })
    if (!liveStream) {
      return res.status(400).json({ message: 'Livestreaming not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.liveStreaming.update({
        where: { id },
        data: { ...rest }
      })
        .then(() => res.status(201).json({ message: 'Livestreaming updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<liveSreamingAttributes>, res: NextApiResponse) {
  try {
    await editLiveStreaming(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}