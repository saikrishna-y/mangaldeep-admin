import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface prasad {
  id: number
}

const deletePrasadCategory = async (data: prasad) => {
  const { id } = data
  try {
    await prisma.prasadCategory.delete({
      where: {
        id
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await deletePrasadCategory(req.body)
    res.status(201).json({ message: 'Prasad category deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
