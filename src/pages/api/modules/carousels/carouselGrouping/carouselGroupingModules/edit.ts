import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface carouselGroupModuleAttributes {
  id: number;
  module_name: string;
  display_name: string;
  image_url: string;
  display_order: number;
  locales: string;
  is_active: boolean;
}

const editCarouselGroupingModule = async (req: ExtendedNextApiRequest<carouselGroupModuleAttributes>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const carouselGroupingModule = await prisma.carouselGroupingModules.findFirst({ where: { id: req.body.id } })
    if (!carouselGroupingModule) {
      return res.status(400).json({ message: 'Carousel Grouping Module not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.carouselGroupingModules.update({
        where: { id },
        data: { ...rest }
      })
        .then(() => res.status(201).json({ message: 'Carousel Grouping Module updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<carouselGroupModuleAttributes>, res: NextApiResponse) {
  try {
    await editCarouselGroupingModule(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}