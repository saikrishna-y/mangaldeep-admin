import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */

import prisma from 'src/utlis/prisma'

const getSankalps = async () => {
  const results = await prisma.sankalp.findMany({
    where: {
      is_active: true
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

    return finalData
  } else {
    return results
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleSankalp = await prisma.sankalp.findUnique({ where: { id: Number(id) } })
      if (singleSankalp) {
        res.status(201).json({ data: singleSankalp })
      } else {
        res.status(404).json({ error: 'Sankalp not found' })
      }
    } catch (err: any) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getSankalps()
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
