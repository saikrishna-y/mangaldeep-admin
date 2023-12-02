import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface prasad {
  name: string
  language_id: number
  display_order: number
  id: number
}

const editPrasadCategory = async (data: prasad) => {
  const { name, language_id, display_order, id } = data
  try {
    await prisma.prasadCategory.update({
      where: { id },
      data: {
        name,
        language_id,
        display_order: Number(display_order)
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editPrasadCategory(req.body)
    res.status(201).json({ message: 'Prasad category updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
