import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const getPrasads = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  const results = await prisma.prasad.findMany({})
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
      const singlePrasad = await prisma.prasad.findUnique({
        where: { id: parseInt(id) }
      })
      if (singlePrasad) {
        res.status(201).json({
          data: JSON.stringify(singlePrasad, (_, value) => (typeof value === 'bigint' ? value.toString() : value))
        })
      } else {
        res.status(404).json({ error: 'Prasad not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      await getPrasads(req, res)
    } catch (e) {

      return res.status(400).json(e)
    }
  }
}
