import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface mangaldeepGeetAttributes {
  name: string
  deity_id: number
  mangaldeep_geet_cat_id: number
  url: string
  duration: string
  locales: string;
  image_url: string;
  display_order: number;
  image_module_id: number;
}

const addMangalDeepGeet = async (req: ExtendedNextApiRequest<mangaldeepGeetAttributes>, res: NextApiResponse) => {
  const { image_module_id, ...rest } = req.body

  if (
    !req.body.name ||
    !req.body.deity_id ||
    !req.body.url ||
    !req.body.duration ||
    !req.body.mangaldeep_geet_cat_id ||
    !req.body.locales ||
    req.body.locales.length == 0 ||
    !req.body.image_url ||
    !req.body.image_module_id
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const existingImage = await prisma.images.findFirst({ where: { image_url: req.body.image_url } })
  if (!existingImage) await prisma.images.create({ data: { image_url: req.body?.image_url, locales: req.body?.locales, image_module_id } })
  await prisma
    .mangaldeepGeet
    .create({ data: rest })
    .then(() => res.status(201).json({ message: 'Mangaldeep Geet added successfully' }))
    .catch((err) => {

      return res.status(400).json(err)
    })
}

export default async function handler(req: ExtendedNextApiRequest<mangaldeepGeetAttributes>, res: NextApiResponse) {
  try {
    await addMangalDeepGeet(req, res)
  } catch (e) {

    return res.status(400).json(e)
  }
}
