import { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from 'src/utlis/prisma'

interface album {
  name: string
  image_id: number
  id: number
  locales: string
}

const editAlbum = async (data: album) => {
  const { id, name, image_id, locales } = data
  try {
    await prisma.albums.update({
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
    await editAlbum(req.body)
    res.status(201).json({ message: 'Album updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
