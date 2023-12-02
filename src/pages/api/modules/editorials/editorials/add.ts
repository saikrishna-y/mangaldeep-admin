import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface editorialAttributes {
  category_id: number;
  subcategory_id: number;
  title: string;
  keywords: string;
  editorial_date: string;
  short_description: string;
  share_url: string;
  locales: string;
  image_module_id: number;
  image_id: number;
  image_url: string;
  is_trending_now?: boolean;
}

const addEditorial = async (req: ExtendedNextApiRequest<editorialAttributes>, res: NextApiResponse) => {
  const { image_module_id, ...rest } = req.body
  if (
    !req.body.category_id ||
    !req.body.subcategory_id ||
    !req.body.title ||
    !req.body.keywords ||
    !req.body.editorial_date ||
    !req.body.locales ||
    req.body.locales.length == 0 ||
    !req.body.short_description ||
    !req.body.share_url
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  if (req.body.image_id) {
    const image = await prisma.images.findFirst({ where: { id: req.body.image_id } })

    const newEditorial = await prisma.editorials.create({ data: { ...rest, image_url: image?.image_url } })
    if (req.body.is_trending_now) await prisma.trendingNow.create({ data: { type_id: 1, category_name: 'editorials', category_id: newEditorial?.id } })

    return res.status(201).json({ message: 'Editorial added successfully' })
  }

  if (req.body?.image_url && req.body?.image_module_id) {
    const existingImage = await prisma.images.findFirst({ where: { image_url: req.body.image_url } })
    if (!existingImage) await prisma.images.create({ data: { image_url: req.body?.image_url, locales: req.body?.locales, image_module_id } })
  }

  const newEditorial = await prisma.editorials.create({ data: rest })
  if (req.body.is_trending_now) await prisma.trendingNow.create({ data: { type_id: 1, category_name: 'editorials', category_id: newEditorial?.id } })

  return res.status(201).json({ message: 'Editorial added successfully' })
}

export default async function handler(req: ExtendedNextApiRequest<editorialAttributes>, res: NextApiResponse) {
  try {
    await addEditorial(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}