import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface geetCategory {
  id: number
}

const deleteGeetCategory = async (data: geetCategory) => {
  const { id } = data
  try {
    await prisma.mangaldeepGeetCategory.delete({
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
    await deleteGeetCategory(req.body)
    res.status(201).json({ message: 'Mangaldeep Geet Category deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
