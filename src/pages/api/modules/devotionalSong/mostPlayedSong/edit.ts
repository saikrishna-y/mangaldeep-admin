import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface song {
  description_to_share: string
  audio_url: string
  deities: string;
  is_new_song: boolean
  is_featured: boolean
  is_famous_song: boolean
  locales: string;
  artists: string;
  id: number
}

const editMostPlayedSongs = async (data: song) => {
  const {
    id,
    description_to_share,
    audio_url,
    deities,
    is_new_song,
    is_featured,
    is_famous_song,
    locales,
    artists,
  } = data
  try {
    await prisma.devotionalSongs.update({
      where: {
        id
      },
      data: {
        description_to_share,
        audio_url,
        deities,
        is_new_song,
        is_featured,
        is_famous_song,
        locales,
        artists,
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editMostPlayedSongs(req.body)
    res.status(201).json({ message: 'Most played song updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
