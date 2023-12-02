import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface pandal {
  name: string
  latitude: string
  longitude: string
  description: string
  address: string
  pandal_url: string
  locales: string;
  deity_id: number
  image_id: number
  id: number
}

const editPandal = async (data: pandal) => {
  const { name, latitude, longitude, description, address, pandal_url, locales, deity_id, image_id, id } = data

  try {
    await prisma.pandals.update({
      where: { id },
      data: {
        name,
        latitude,
        longitude,
        description,
        address,
        pandal_url,
        locales,
        deity_id,
        image_id
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editPandal(req.body)
    res.status(201).json({ message: 'Pandal updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
