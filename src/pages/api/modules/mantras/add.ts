import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface mantras {
  name: string
  description_text: string
  deity_id: number
  mantra_content: string
  pronunciation: string
  locales: string;
  upload_song: string
}

const addMantra = async (data: mantras) => {
  const { name, description_text, deity_id, mantra_content, pronunciation, locales, upload_song } = data
  try {
    await prisma.mantras.create({
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
