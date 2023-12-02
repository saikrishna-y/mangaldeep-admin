import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const getCarouselGroupings = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  const results = await prisma.carouselGrouping.findMany({})
  if (results.length > 0) {
    const finalData: any = []
    for (const d of results) {
      const locales = await prisma.locales.findMany({
        where: {
          id: {
            in: JSON.parse(JSON.stringify(d?.locales))
          }
        }
      })

      // const finalData = results.map(data => {
      //   const locale = locales.map(d => {
      //     return d
      //   })

      //   return {
      //     ...data,
      //     locales: locale
      //   }
      // })
      const params: any = { ...d }
      params.locales = locales
      finalData.push(params)
    }

    return res.status(200).json(finalData)
  }

  return res.status(200).json(results)
}

const getSingleCarouselGrouping = async (req: any, res: NextApiResponse) => {
  await prisma
    .carouselGrouping
    .findUnique({ where: { id: parseInt(req.query.id) } })
    .then((singleTempleRaaga) => {
      res.status(200).json({ data: singleTempleRaaga })
    })
    .catch((err) => {
      return res.status(400).json(err)
    })
}

export default async function handler(req: ExtendedNextApiRequest<{}>, res: NextApiResponse) {
  try {
    if (req.query.id) {
      await getSingleCarouselGrouping(req, res)
    } else {
      await getCarouselGroupings(req, res)
    }
  } catch (e) {
    return res.status(400).json(e)
  }
}
