import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma"

interface album {
  id: number
  icon_url: string
  locales: []
}

const editIcon = async (data: album) => {
  const { id, icon_url, locales } = data
  try {
    await prisma.mangaldeepHomeIcon.update({
      where: { id },
      data: {
        id,
        icon_url,
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
    await editIcon(req.body)
    res.status(201).json({ message: 'Mangaldeep Icon updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
