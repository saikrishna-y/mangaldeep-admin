import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface templeRaaga {
  id: number
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
  is_active: boolean
}

const editTempleRaaga = async (req: ExtendedNextApiRequest<templeRaaga>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const templeRaaga = await prisma.templeRaagas.findFirst({ where: { id: req.body.id } })
    if (!templeRaaga) {
      return res.status(400).json({ message: 'Temple Raaga not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.templeRaagas.update({
        where: { id },
        data: { ...rest }
      })
        .then(() => res.status(201).json({ message: 'Temple Raaga updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<templeRaaga>, res: NextApiResponse) {
  try {
    await editTempleRaaga(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}