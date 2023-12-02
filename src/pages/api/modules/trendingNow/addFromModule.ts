import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface addTrend {
  type_id: number
  category_name: 'devotionalSongs' | 'carouselGrouping' | 'puja' | 'mantras' | 'editorials' | 'templeOfIndia'
  category_id: number;
  deleted_at?: string;
  deleted_by?: string;
}

// This api is responsible for adding a record in Trending now via any Module
const addTrendingNow = async (req: ExtendedNextApiRequest<addTrend>, res: NextApiResponse) => {
  if (
    !req.body.type_id ||
    !req.body.category_name ||
    !req.body.category_id
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    if (req.body.category_name == 'devotionalSongs') {
      await prisma.devotionalSongs.update({ where: { id: req.body.category_id }, data: { is_trending_now: true } })
    } else if (req.body.category_name == 'carouselGrouping') {
      await prisma.carouselGrouping.update({ where: { id: req.body.category_id }, data: { is_trending_now: true } })
    } else if (req.body.category_name == 'mantras') {
      await prisma.mantras.update({ where: { id: req.body.category_id }, data: { is_trending_now: true } })
    } else if (req.body.category_name == 'editorials') {
      await prisma.editorials.update({ where: { id: req.body.category_id }, data: { is_trending_now: true } })
    } else if (req.body.category_name == 'templeOfIndia') {
      await prisma.templeOfIndia.update({ where: { id: req.body.category_id }, data: { is_trending_now: true } })
    } else {
      
      // await prisma.puja.update({ where: { id: req.body.category_id }, data: { is_trending_now: true } })
    }
    await prisma.trendingNow
      .create({ data: req.body })
      .then(() => res.status(201).json({ message: `${req.body.category_name} added to Trending Now successfully!` }))
      .catch((err: any) => {
        return res.status(400).json(err)
      })
  }
}

export default async function handler(req: ExtendedNextApiRequest<addTrend>, res: NextApiResponse) {
  try {
    await addTrendingNow(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}