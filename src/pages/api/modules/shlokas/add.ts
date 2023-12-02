import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface shlokas {
  name: string
  deity_id: number
  content: string
  pronunciation: string
  url: string
  description_text: string
  locales: string
  audio_url: string
}

const addShloka = async (data: shlokas) => {
  const {
    name,
    content,
    pronunciation,
    description_text,
    locales,
  } = data
  try {
    await prisma.shlokas.create({
      data: {
        name,
        deity_id: 1,
        content,
        pronunciation,
        description_text,
        locales
      }
    })

    return true
  } catch (err) {
    console.log('err in shlokas', err)

    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req?.body) {
    res.status(500).send('Fields can not be empty')
  } else {
    try {
      await addShloka(req.body)
      res.status(201).json({ message: 'Shloka added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
