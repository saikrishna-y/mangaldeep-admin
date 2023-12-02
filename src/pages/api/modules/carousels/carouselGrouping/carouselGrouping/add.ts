import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface carouselGroupingAttributes {
  carousel_grouping_module_id: number;
  name: string;
  display_order: number;
  new_record?: boolean;
  is_ios?: boolean;
  url: string;
  duration: string;
  short_desc: string;
  locales: string;
  image_url: string;
  description: string;
  is_trending_now?: boolean;
}

const addCarouselGroupingModule = async (req: ExtendedNextApiRequest<carouselGroupingAttributes>, res: NextApiResponse) => {
  if (
    !req.body.carousel_grouping_module_id ||
    !req.body.name ||
    !req.body.display_order ||
    !req.body.url ||
    !req.body.duration ||
    !req.body.short_desc ||
    !req.body.locales ||
    !req.body.image_url ||
    !req.body.description ||
    req.body.locales.length <= 0
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {

    // const watchRecord = await prisma.watch.create({})
    // if (req.body.is_trending_now) {
    //   const carouselGroupingRecord = await prisma
    //     .carouselGrouping
    //     .create({ data: { id: watchRecord.id, ...req.body } })
    //   await prisma
    //     .trendingNow
    //     .create({ data: { typeId: 2, categoryName: 'carouselGrouping', categoryId: carouselGroupingRecord.id } })
    //     .then(() => res.status(201).json({ message: 'Carousel Grouping created successfully' }))
    //     .catch((err: any) => { return res.status(400).json(err) })
    // }
    // await prisma
    //   .carouselGrouping
    //   .create({ data: { id: watchRecord.id, ...req.body } })
    //   .then(() => res.status(201).json({ message: 'Carousel Grouping created successfully' }))
    //   .catch((err: any) => { return res.status(400).json(err) })

    // await prisma.watch.create({ data: { count: 0, category_name: 'carouselGrouping' } })
    const carouselGrouping = await prisma.carouselGrouping.create({ data: req.body })
    if (req.body.is_trending_now) await prisma.trendingNow.create({ data: { type_id: 3, category_name: 'carouselGrouping', category_id: carouselGrouping?.id } })
    await prisma
      .watch
      .create({ data: { count: 0, category_name: 'carouselGrouping', category_id: carouselGrouping?.id } })
      .then(() => res.status(201).json({ message: 'Carousel Grouping added successfully' }))
      .catch((err) => {

        return res.status(400).json(err)
      })
  }
}

export default async function handler(req: ExtendedNextApiRequest<carouselGroupingAttributes>, res: NextApiResponse) {
  try {
    await addCarouselGroupingModule(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}