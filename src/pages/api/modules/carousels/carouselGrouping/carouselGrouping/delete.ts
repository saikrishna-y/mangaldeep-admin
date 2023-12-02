import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const deleteCarouselGrouping = async (req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const carouselGrouping = await prisma.carouselGrouping.findFirst({ where: { id: req.body.id } })
    if (!carouselGrouping) {
      return res.status(400).json({ message: 'Carousel Grouping not found' })
    } else {
      await prisma
        .carouselGrouping
        .delete({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Carousel Grouping deleted successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) {
  try {
    await deleteCarouselGrouping(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}