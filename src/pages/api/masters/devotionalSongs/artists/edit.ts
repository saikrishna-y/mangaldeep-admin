import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface artists {
  name: string
  image_id: number
  id: number
  locales: string;
}

const editArtists = async (data: artists) => {
  const { id, name, image_id, locales } = data
  try {
    await prisma.artists.update({
      where: { id },
      data: {
        name,
        image_id,
        locales
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editArtists(req.body)
    res.status(201).json({ message: 'Artist updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
