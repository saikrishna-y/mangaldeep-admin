import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'src/utlis/prisma'

const getIcon = async () => {
  const results = await prisma.mangaldeepHomeIcon.findMany()
  if (results.length > 0) {
    const finalData = []
    for (const d of results) {
      console.log(d.locales, 'saasdasdasadsads')
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

    return finalData
  } else {
    return results
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleIcon = await prisma.mangaldeepHomeIcon.findUnique({ where: { id: Number(id) } })
      if (singleIcon) {
        res.status(201).json({ data: singleIcon })
      } else {
        res.status(404).json({ error: 'Icon not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getIcon()
      if (response) {
        res.status(201).json({ data: response })
      } else {
        res.status(400)
      }
    } catch (e: any) {
      res.status(500).send(e.toString())
    }
  }
}
