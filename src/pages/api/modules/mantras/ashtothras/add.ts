import { NextApiRequest, NextApiResponse } from 'next/types'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Shlokas {
  name: string
  description_to_share: string
  deity_id: number
  locales: string;
  ashtothra_details: any[]
}

const addAshtothra = async (data: Shlokas) => {
  const { name, description_to_share, deity_id, locales, ashtothra_details } = data
  try {
    const reponse = await prisma.ashtothras.create({
      data: {
        name,
        description_to_share,
        deity_id,
        locales,
      }
    })
    const details = []
    if (ashtothra_details.length > 0) {
      for (const data of ashtothra_details) {
        const params = { ...data, ashtothras_id: reponse?.id }
        details.push(params)
      }
      await prisma.ashtothraDetails.createMany({
        data: details
      })
    }

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
      await addAshtothra(req.body)
      res.status(201).json({ message: 'Ashtothra added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
