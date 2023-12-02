import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface song {
  id: number
}

const deleteMostPlayedSongs = async (data: song) => {
  const { id } = data
  try {
    await prisma.mostPlayedSongs.delete({
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
    await deleteMostPlayedSongs(req.body)
    res.status(201).json({ message: 'Most played song deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
