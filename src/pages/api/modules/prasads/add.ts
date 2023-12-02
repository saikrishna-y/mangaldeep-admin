import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface eventAttributes {
  language_id: number
  name: string
  short_description?: string
  url: string
  duration: string
  prasad_category_id: number
  is_android?: boolean
  is_ios?: boolean
  locales: string
  festivals: string
  image_url?: string
  prasad_description?: string;
  image_module_id: number;
  language: string;
}

const addPrasad = async (req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) => {
  const { image_module_id, ...rest } = req.body

  if (
    !req.body.language_id ||
    !req.body.name ||
    !req.body.url ||
    !req.body.duration ||
    !req.body.prasad_category_id ||
    !req.body.locales ||
    req.body.locales.length == 0 ||
    !req.body.festivals ||
    req.body.festivals.length == 0 ||
    !req.body.image_url
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (req.body?.image_url && req.body?.image_module_id) {
    const existingImage = await prisma.images.findFirst({ where: { image_url: req.body.image_url } })
    if (!existingImage) await prisma.images.create({ data: { image_url: req.body?.image_url, locales: req.body?.locales, image_module_id } })
    await prisma
      .prasad
      .create({ data: rest })
      .then(() => res.status(201).json({ message: 'Prasad added successfully' }))
      .catch((err) => {

        return res.status(400).json(err)
      })
  }
}

export default async function handler(req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) {
  try {
    await addPrasad(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}
