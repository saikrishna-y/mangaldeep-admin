import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface chalisas {
  name: string
  description: string
  deity_id: number
  image_id: number
  content: string
  locales: string
}

const addChalisas = async (data: chalisas) => {
  try {
    await prisma.chalisas.create({
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
      await addChalisas(req.body)
      res.status(201).json({ message: 'Chalisas added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
