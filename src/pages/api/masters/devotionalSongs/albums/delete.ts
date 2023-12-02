import { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from 'src/utlis/prisma'

interface album {
  id: number
}

const deleteAlbum = async (data: album) => {
  const { id } = data
  try {
    await prisma.albums.delete({
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
    res.status(500).send('Please select any one album to delete')
  } else {
    try {
      await deleteAlbum(req.body)
      res.status(201).json({ message: 'Album deleted successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
