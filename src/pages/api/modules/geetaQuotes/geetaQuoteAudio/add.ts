import { NextApiRequest, NextApiResponse } from 'next/types'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// interface geet {
//   geeta_quotes: []
//   languages: []
// }

const addgeetAudio = async (data: any) => {
  try {
    await prisma.geetaAudio.create({
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
      await addgeetAudio(req.body)
      res.status(201).json({ message: 'Geeta quote audio added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
