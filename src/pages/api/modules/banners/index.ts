import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const getBanners = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  const results = await prisma.banner.findMany()
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

export default async function handler(req: ExtendedNextApiRequest<{}>, res: NextApiResponse) {
  const { id } = req.query as any

  if (id) {
    try {
      const singleBanner = await prisma.banner.findUnique({ where: { id: parseInt(id) } })
      if (singleBanner) {
        res.status(201).json({ data: singleBanner })
      } else {
        res.status(404).json({ error: 'Banner not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      await getBanners(req, res)
    } catch (e) {
      return res.status(400).json(e)
    }
  }
}
