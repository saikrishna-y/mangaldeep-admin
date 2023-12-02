import { NextApiRequest, NextApiResponse } from 'next/types'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface mantras {
  name: string
  description_text: string
  deity_id: number
  mantra_content: string
  pronunciation: string
  locales: string;
  upload_song: string;
  is_trending_now?: boolean;
}

const addMantra = async (data: mantras) => {
  const { name, description_text, deity_id, mantra_content, pronunciation, locales, upload_song } = data
  try {
    const newMantra = await prisma.mantras.create({
      data: {
        name,
        description_text,
        deity_id,
        mantra_content,
        pronunciation,
        locales,
        upload_song
      }
    })
    if (data.is_trending_now) await prisma.trendingNow.create({ data: { type_id: 1, category_name: 'mantras', category_id: newMantra?.id } })

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
      await addMantra(req.body)
      res.status(201).json({ message: 'Mantra added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
