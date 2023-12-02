import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const getTempleRaagas = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  const results = await prisma.templeOfIndia.findMany({
    include: {
      Language: true,
    }
  })
  if (results.length > 0) {
    const finalData = []
    for (const d of results) {
      const locales = await prisma.locales.findMany({
        where: {
          id: {
            in: JSON.parse(JSON.stringify(d.locales))
          }
        }
      })
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
      const singleTemplesOfIndia = await prisma.templeOfIndia.findUnique({ where: { id: parseInt(id) } })
      if (singleTemplesOfIndia) {
        res.status(200).send({ data: singleTemplesOfIndia })
      } else {
        res.status(200).send({ error: 'Temples of India not found' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    try {
      await getTempleRaagas(req, res)
    } catch (e) {

      return res.status(400).json(e)
    }
  }
}
