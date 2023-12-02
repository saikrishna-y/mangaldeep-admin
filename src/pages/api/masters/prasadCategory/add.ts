import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface prasad {
  name: string
  language_id: number
  display_order: string
}

const addPrasadCategory = async (data: prasad) => {
  const { name, language_id, display_order } = data
  try {
    await prisma.prasadCategory.create({
      data: {
        name,
        language_id,
        display_order: parseInt(display_order)
      }
    })

    return true
  } catch (err) {
    console.log('err in prasad category', err)

    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, language_id, display_order } = req?.body
  if (name?.length <= 0) {
    res.status(500).send('Name can not be empty')
  } else if (!language_id) {
    res.status(500).send('Language can not be empty')
  } else if (!display_order) {
    res.status(500).send('Display order can not be empty')
  } else {
    try {
      await addPrasadCategory(req.body)
      res.status(201).json({ message: 'Prasad category added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
