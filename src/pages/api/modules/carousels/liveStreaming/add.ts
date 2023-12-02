import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface liveStreaming {
  name: string;
  is_video: boolean;
  display_order: number;
  is_android: boolean;
  is_ios: boolean;
  video_url: string;
  duration: string;
  image_url: string;
  date: string;
  description: string;
  locales: []
}

const addLiveStreaming = async (req: ExtendedNextApiRequest<liveStreaming>, res: NextApiResponse) => {
  if (
    !req.body.name ||
    !req.body.display_order ||
    !req.body.video_url ||
    !req.body.duration ||
    !req.body.image_url ||
    !req.body.date ||
    !req.body.description ||
    !req.body.locales
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  if (req.body.locales.length <= 0) {
    return res.status(400).json({ message: 'Enter at least one locale id' })
  }

  // const watchRecord = await prisma.watch.create({})
  await prisma
    .liveStreaming
    .create({ data: req.body })
    .then(() => res.status(201).json({ message: 'Live streaming created successfully' }))
    .catch((err: any) => {

      return res.status(400).json(err)
    })
}

export default async function handler(req: ExtendedNextApiRequest<liveStreaming>, res: NextApiResponse) {
  try {
    await addLiveStreaming(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}