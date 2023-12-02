import { NextApiRequest, NextApiResponse } from 'next/types'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Chalisas {
  id: number
}

const deleteChalisa = async (data: Chalisas) => {
  const { id } = data
  try {
    await prisma.chalisas.delete({
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
    await deleteChalisa(req.body)
    res.status(201).json({ message: 'Chalisas deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
