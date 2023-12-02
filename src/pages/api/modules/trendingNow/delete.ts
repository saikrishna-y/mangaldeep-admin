import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface deleteTrend {
  id: number
}

// This api is responsible for deleting a record directly from Trending Now
const deleteTrendingNow = async (req: ExtendedNextApiRequest<deleteTrend>, res: NextApiResponse) => {
  const { id } = req.body
  if (!id) {
    return res.status(400).json({ message: 'Trending now id is required' })
  } else {
    const trendingNow = await prisma.trendingNow.findFirst({ where: { id } })
    if (!trendingNow) {
      return res.status(400).json({ message: 'Trending now record not found' })
    } else {
      await prisma.trendingNow.delete({ where: { id } })
      if (trendingNow.category_name == 'devotionalSongs') {
        await prisma
          .devotionalSongs
          .update({ where: { id: trendingNow.category_id }, data: { is_trending_now: false } })
          .then(() => res.status(200).json({ message: 'Trending now deleted successfully' }))
          .catch((err) => {

            return res.status(400).json(err)
          })
      } else if (trendingNow.category_name == 'carouselGrouping') {
        await prisma
          .carouselGrouping
          .update({ where: { id: trendingNow.category_id }, data: { is_trending_now: false } })
          .then(() => res.status(200).json({ message: 'Trending now deleted successfully' }))
          .catch((err) => {

            return res.status(400).json(err)
          })
      } else if (trendingNow.category_name == 'mantras') {
        await prisma
          .mantras
          .update({ where: { id: trendingNow.category_id }, data: { is_trending_now: false } })
          .then(() => res.status(200).json({ message: 'Trending now deleted successfully' }))
          .catch((err) => {

            return res.status(400).json(err)
          })
      } else if (trendingNow.category_name == 'editorials') {
        await prisma
          .editorials
          .update({ where: { id: trendingNow.category_id }, data: { is_trending_now: false } })
          .then(() => res.status(200).json({ message: 'Trending now deleted successfully' }))
          .catch((err) => {

            return res.status(400).json(err)
          })
      } else if (trendingNow.category_name == 'templeOfIndia') {
        await prisma
          .templeOfIndia
          .update({ where: { id: trendingNow.category_id }, data: { is_trending_now: false } })
          .then(() => res.status(200).json({ message: 'Trending now deleted successfully' }))
          .catch((err) => {

            return res.status(400).json(err)
          })
      } else {
        
        // await prisma
        //   .puja
        //   .update({ where: { id: trendingNow.category_id }, data: { is_trending_now: false } })
        //   .then(() => res.status(200).json({ message: 'Trending now deleted successfully' }))
        //   .catch((err) => {

        //     return res.status(400).json(err)
        //   })
      }
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<deleteTrend>, res: NextApiResponse) {
  try {
    await deleteTrendingNow(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}