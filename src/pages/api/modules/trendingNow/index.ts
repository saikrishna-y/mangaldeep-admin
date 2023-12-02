import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const getAllTrendingNow = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  const allTrendingNows = await prisma.trendingNow.findMany({ include: { ModuleType: true } })

  const alteredData: {}[] = []
  if (allTrendingNows.length > 0) {
    for (const trendingRecord of allTrendingNows) {
      if (trendingRecord.category_name == 'carouselGrouping') {
        const liveStream = await prisma.carouselGrouping.findFirst({ where: { id: trendingRecord.category_id } })
        alteredData.push({ ...trendingRecord, ...liveStream, id: trendingRecord.id })
      } else if (trendingRecord.category_name == 'devotionalSongs') {
        const devotionalSong = await prisma.devotionalSongs.findFirst({ where: { id: trendingRecord.category_id } })
        alteredData.push({ ...trendingRecord, ...devotionalSong, id: trendingRecord.id })
      } else if (trendingRecord.category_name == 'puja') {
        
        // const puja = await prisma.puja.findFirst({ where: { id: trendingRecord.category_id } })
        // alteredData.push({ ...trendingRecord, ...puja, id: trendingRecord.id })
      } else if (trendingRecord.category_name == 'mantras') {
        const mantra = await prisma.mantras.findFirst({ where: { id: trendingRecord.category_id } })
        alteredData.push({ ...trendingRecord, ...mantra, id: trendingRecord.id })
      } else if (trendingRecord.category_name == 'editorials') {
        const editorial = await prisma.editorials.findFirst({ where: { id: trendingRecord.category_id } })
        alteredData.push({ ...trendingRecord, ...editorial, id: trendingRecord.id, name: editorial?.title })
      } else if (trendingRecord.category_name == 'templeOfIndia') {
        const templeOfIndia = await prisma.templeOfIndia.findFirst({ where: { id: trendingRecord.category_id } })
        alteredData.push({ ...trendingRecord, ...templeOfIndia, id: trendingRecord.id })
      } else {
        alteredData.push(trendingRecord)
      }
    }

    return res.status(200).json(alteredData)
  }

  return res.status(200).json(allTrendingNows)
}

const getSingleTrendingNow = async (req: any, res: NextApiResponse) => {
  await prisma
    .trendingNow
    .findUnique({ where: { id: parseInt(req.query.id) } })
    .then((singleTrendingNow) => {
      res.status(200).json({ data: singleTrendingNow })
    })
    .catch((err) => {

      return res.status(400).json(err)
    })
}

export default async function handler(req: ExtendedNextApiRequest<{}>, res: NextApiResponse) {
  try {
    if (req.query.id) {
      await getSingleTrendingNow(req, res)
    } else {
      await getAllTrendingNow(req, res)
    }
  } catch (e) {
    return res.status(400).json(e)
  }
}
