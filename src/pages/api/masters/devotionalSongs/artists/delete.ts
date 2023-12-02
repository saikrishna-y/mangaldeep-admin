import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface artists {
  id: number
}

const deleteArtists = async (data: artists) => {
  const { id } = data
  try {
    await prisma.artists.delete({
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
  const { id } = req.body
  if (!id) {
    res.status(500).send('Please select any one artists to delete')
  } else {
    try {
      await deleteArtists(req.body)
      res.status(201).json({ message: 'Artists deleted successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
