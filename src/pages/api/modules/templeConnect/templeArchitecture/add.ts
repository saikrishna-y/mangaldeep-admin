import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface templeArchitectureAttributes {
  language_id: number
  locales: string;
  name: string
  short_description?: string
  url: string
  duration: string
  is_android?: boolean
  is_ios?: boolean
  image_url: string
  temple_description?: string;
  image_module_id: number;
}

const addTempleArchitecture = async (
  req: ExtendedNextApiRequest<templeArchitectureAttributes>,
  res: NextApiResponse
) => {
  const { image_module_id, ...rest } = req.body

  if (
    !req.body.language_id ||
    !req.body.locales ||
    req.body.locales.length == 0 ||
    !req.body.name ||
    !req.body.url ||
    !req.body.duration ||
    !req.body.image_url
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (req.body?.image_url && req.body?.image_module_id) {
    const existingImage = await prisma.images.findFirst({ where: { image_url: req.body.image_url } })
    if (!existingImage) await prisma.images.create({ data: { image_url: req.body?.image_url, locales: req.body?.locales, image_module_id } })
  }

  await prisma
    .templeArchitecture
    .create({ data: rest })
    .then(() => res.status(201).json({ message: 'Temple Architecture added successfully' }))
    .catch((err) => {

      return res.status(400).json(err)
    })
}

export default async function handler(req: ExtendedNextApiRequest<templeArchitectureAttributes>, res: NextApiResponse) {
  try {
    await addTempleArchitecture(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}
