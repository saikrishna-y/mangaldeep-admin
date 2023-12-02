import { NextApiRequest, NextApiResponse } from 'next/types'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface calendar {
  festival_id: number
  festival_date: string
  locales: []
}

const addFestivalCalendar = async (data: calendar) => {
  const { festival_id, festival_date, locales } = data
  try {
    await prisma.festivalCalendar.create({
      data: {
        festival_id,
        festival_date,
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
      await addFestivalCalendar(req.body)
      res.status(201).json({ message: 'Festival calendar added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
