import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface carouselGroupModuleAttributes {
  display_name: string;
  image_url: string;
  display_order: number;
  locales: string;
}

const addCarouselGroupingModule = async (req: ExtendedNextApiRequest<carouselGroupModuleAttributes>, res: NextApiResponse) => {
  if (
    !req.body.display_name ||
    !req.body.image_url ||
    !req.body.display_order ||
    !req.body.locales ||
    req.body.locales.length <= 0
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    await prisma
      .carouselGroupingModules
      .create({ data: req.body })
      .then(() => res.status(201).json({ message: 'Carousel Grouping Module created successfully' }))
      .catch((err: any) => { return res.status(400).json(err) })
  }
}

export default async function handler(req: ExtendedNextApiRequest<carouselGroupModuleAttributes>, res: NextApiResponse) {
  try {
    await addCarouselGroupingModule(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}