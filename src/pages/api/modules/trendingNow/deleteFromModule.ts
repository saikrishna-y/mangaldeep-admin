import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface deleteFromModuleTypes {
  type_id: number;
  category_name: 'devotionalSongs' | 'carouselGrouping' | 'puja' | 'mantras' | 'editorials' | 'templeOfIndia'
  category_id: number;
}

const deleteFromModule = async (req: ExtendedNextApiRequest<deleteFromModuleTypes>, res: NextApiResponse) => {
  const { type_id, category_name, category_id } = req.body
  if (!type_id || !category_name || !category_id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const trending = await prisma.trendingNow.findFirst({ where: { type_id, category_name, category_id } })
    await prisma.trendingNow.delete({ where: { id: trending?.id } })
    if (category_name == 'devotionalSongs') {
      await prisma
        .devotionalSongs
        .update({ where: { id: category_id }, data: { is_trending_now: false } })
        .then(() => res.status(200).json({ message: 'Removed from Trending Now successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    } else if (category_name == 'carouselGrouping') {
      await prisma
        .carouselGrouping
        .update({ where: { id: category_id }, data: { is_trending_now: false } })
        .then(() => res.status(200).json({ message: 'Removed from Trending Now successfully' }))
        .catch((err: any) => {

          return res.status(400).json(err)
        })
    } else if (category_name == 'mantras') {
      await prisma
        .mantras
        .update({ where: { id: category_id }, data: { is_trending_now: false } })
        .then(() => res.status(200).json({ message: 'Removed from Trending Now successfully' }))
        .catch((err: any) => {

          return res.status(400).json(err)
        })
    } else if (category_name == 'editorials') {
      await prisma
        .editorials
        .update({ where: { id: category_id }, data: { is_trending_now: false } })
        .then(() => res.status(200).json({ message: 'Removed from Trending Now successfully' }))
        .catch((err: any) => {

          return res.status(400).json(err)
        })
    } else if (category_name == 'templeOfIndia') {
      await prisma
        .templeOfIndia
        .update({ where: { id: category_id }, data: { is_trending_now: false } })
        .then(() => res.status(200).json({ message: 'Removed from Trending Now successfully' }))
        .catch((err: any) => {

          return res.status(400).json(err)
        })
    } else {
      
      // await prisma
      //   .puja
      //   .update({ where: { id: category_id }, data: { is_trending_now: false } })
      //   .then(() => res.status(200).json({ message: 'Removed from Trending Now successfully' }))
      //   .catch((err: any) => {
      //     return res.status(400).json(err)
      //   })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<deleteFromModuleTypes>, res: NextApiResponse) {
  try {
    await deleteFromModule(req, res)
  } catch (e) {

    return res.status(400).json(e)
  }
}