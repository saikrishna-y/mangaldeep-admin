import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface eventAttributes {
  id: number
  language_id: number
  name: string
  short_description?: string
  url: string
  duration: string
  prasad_category_id: number
  is_android: boolean
  is_ios: boolean
  locales: string;
  festival_id: number
  image_url: string
  prasad_description?: string
  is_active: boolean
}

const editPrasad = async (req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const prasad = await prisma.prasad.findFirst({ where: { id: req.body.id } })
    if (!prasad) {
      return res.status(400).json({ message: 'Prasad not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.prasad
        .update({
          where: { id },
          data: { ...rest }
        })
        .then(() => res.status(201).json({ message: 'Prasad updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) {
  try {
    await editPrasad(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}
