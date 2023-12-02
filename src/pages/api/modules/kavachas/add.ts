import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface kavachas {
  name: string
  deity_id: number
  image_id: number
  kavacha_content: string
  locales: string
}

const addChalisas = async (data: kavachas) => {
  const { name, deity_id, image_id, kavacha_content, locales } = data
  try {
    await prisma.kavachas.create({
      data: {
        name,
        deity_id,
        image_id,
        kavacha_content,
        locales
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req?.body) {
    res.status(500).send('Fields can not be empty')
  } else {
    try {
      await addChalisas(req.body)
      res.status(201).json({ message: 'kavachas added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
