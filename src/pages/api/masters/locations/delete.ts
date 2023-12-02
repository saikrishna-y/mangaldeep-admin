import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface Location {
  id: number
}

const deleteLocation = async (data: Location) => {
  const { id } = data
  try {
    await prisma.locations.delete({
      where: {
        id
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await deleteLocation(req.body)
    res.status(200).json({ message: 'Location deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
