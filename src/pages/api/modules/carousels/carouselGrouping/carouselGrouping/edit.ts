import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface carouselGroupingAttributes {
  id: number;
  module_name: string;
  name: string;
  display_order: number;
  new_record: boolean;
  is_ios: boolean;
  locales: string;
  module_data: string;
  image_url: string;
  is_active: boolean;
}

const editCarouselGroupingModule = async (req: ExtendedNextApiRequest<carouselGroupingAttributes>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const carouselGrouping = await prisma.carouselGrouping.findFirst({ where: { id: req.body.id } })
    if (!carouselGrouping) {
      return res.status(400).json({ message: 'Carousel Grouping not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.carouselGrouping.update({
        where: { id },
        data: { ...rest }
      })
        .then(() => res.status(201).json({ message: 'Carousel Grouping updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<carouselGroupingAttributes>, res: NextApiResponse) {
  try {
    await editCarouselGroupingModule(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}