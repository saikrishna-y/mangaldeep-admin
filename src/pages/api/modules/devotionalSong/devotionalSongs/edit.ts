import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma"

interface song {
  song_id: number
  locale_id: number
  id: number
}

const editDevotionalSongs = async (data: song) => {
  const { locale_id, id } = data
  try {
    await prisma.mostPlayedSongs.update({
      where: {
        id
      },
      data: {
        // song_id,
        locale_id
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editDevotionalSongs(req.body)
    res.status(201).json({ message: 'Devotional song updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
