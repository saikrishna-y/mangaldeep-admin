import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const getLocations = async () => {
  const results = await prisma.locations.findMany({
    include: {
      Country: true,
      Zone: true
    }
  })

  return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleLocation = await prisma.locations.findUnique({ where: { id: Number(id) } })
      if (singleLocation) {
        res.status(201).json({ data: singleLocation })
      } else {
        res.status(404).json({ error: 'Location not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getLocations()
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
