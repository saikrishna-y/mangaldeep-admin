import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const getRelease = async () => {
  try {
    const result = await prisma.releaseManagement.findMany({
      include: {
        DeviceType: true
      }
    })

    return result
  } catch (err) {
    return err
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (id) {
    try {
      const singleReleaseManagement = await prisma.releaseManagement.findUnique({ where: { id: Number(id) } })
      if (singleReleaseManagement) {
        res.status(201).json({ data: singleReleaseManagement })
      } else {
        res.status(404).json({ error: 'ReleaseManagement not found' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    try {
      const result = await getRelease()
      res.status(201).json({ data: result })
    } catch (err: any) {
      res.status(500).send(err)
    }
  }
}

export default handler
