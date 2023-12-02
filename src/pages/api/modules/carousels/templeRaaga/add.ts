import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface templeRaaga {
  name: string
  artist_name: string
  display_order: number
  is_android: boolean
  is_ios: boolean
  url: string
  duration: string
  locales: []
  image_url: string
  description: string
}

const addTempleRaaga = async (req: ExtendedNextApiRequest<templeRaaga>, res: NextApiResponse) => {
  if (
    !req.body.name ||
    !req.body.artist_name ||
    !req.body.display_order ||
    !req.body.url ||
    !req.body.duration ||
    !req.body.locales ||
    req.body.locales.length <= 0
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    await prisma.templeRaagas
      .create({ data: req.body })
      .then(() => res.status(201).json({ message: 'Temple Raaga created successfully' }))
      .catch((err: any) => {
        return res.status(400).json(err)
      })
  }
}

export default async function handler(req: ExtendedNextApiRequest<templeRaaga>, res: NextApiResponse) {
  try {
    await addTempleRaaga(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}
