import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface templeOfIndiaAttributes {
  language_id: number
  locales: string
  deities: number[]
  name: string
  short_description?: string
  url: string
  image_url: string;
  image_module_id: number;
  is_trending_now?: boolean;
}

const addTempleOfIndia = async (req: ExtendedNextApiRequest<templeOfIndiaAttributes>, res: NextApiResponse) => {
  const { image_module_id, ...rest } = req.body

  if (
    !req.body.language_id ||
    !req.body.locales ||
    req.body.locales.length == 0 ||
    !req.body.deities ||
    req.body.deities.length == 0 ||
    !req.body.name ||
    !req.body.url ||
    !req.body.image_url
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (req.body?.image_url && req.body?.image_module_id) {
    const existingImage = await prisma.images.findFirst({ where: { image_url: req.body.image_url } })
    if (!existingImage) await prisma.images.create({ data: { image_url: req.body?.image_url, locales: req.body?.locales, image_module_id } })
    const newTempleOfIndia = await prisma.templeOfIndia.create({ data: rest })
    if (req.body.is_trending_now) await prisma.trendingNow.create({ data: { type_id: 1, category_name: 'templeOfIndia', category_id: newTempleOfIndia?.id } })

    // await prisma
    //   .templeOfIndia
    //   .create({ data: rest })
    //   .then(() => res.status(201).json({ message: 'Temple of India added successfully' }))
    //   .catch((err) => {

    //     return res.status(400).json(err)
    //   })

    return res.status(201).json({ message: 'Temple of India added successfully' })
  }
}

export default async function handler(req: ExtendedNextApiRequest<templeOfIndiaAttributes>, res: NextApiResponse) {
  try {
    await addTempleOfIndia(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}
