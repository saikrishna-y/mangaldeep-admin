import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'src/utlis/prisma'

const getTempleLocators = async () => {
  const results = await prisma.templeLocator.findMany({
    include: {
      Deities: true
    }
  })
  if (results.length > 0) {
    const finalData = []
    for (const d of results) {
      console.log(d.locales, 'saasdasdasadsads')
      const locales = await prisma.locales.findMany({
        where: {
          id: {
            in: JSON.parse(JSON.stringify(d.locales))
          }
        },
      })
      const params: any = { ...d }
      params.locales = locales
      finalData.push(params)
    }

    return finalData
  } else {
    return results
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleTempleLocator = await prisma.templeLocator.findUnique({ where: { id: Number(id) } })
      if (singleTempleLocator) {
        res.status(201).json({ data: singleTempleLocator })
      } else {
        res.status(404).json({ error: 'TempleLocator   not found' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getTempleLocators()
      if (response) {
        res.status(201).json(response)
      } else {
        res.status(400)
      }
    } catch (e: any) {
      res.status(500).send(e.toString())
    }
  }
}
