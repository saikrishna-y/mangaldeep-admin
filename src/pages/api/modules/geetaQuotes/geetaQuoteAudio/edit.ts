import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

// interface geet {
//   name: string
//   audio_language_id: number
//   upload_song: string
//   geeta_quotes: []
//   languages: []
//   id: number
// }

const editGeetAudio = async (data: any) => {
  try {
    await prisma.geetaAudio.update({
      where: { id: data?.id },
      data
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
      await editGeetAudio(req.body)
      res.status(201).json({ message: 'Geeta quote audio updated successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
