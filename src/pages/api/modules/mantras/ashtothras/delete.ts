import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface mantras {
  id: number
}

const deleteAshtothra = async (data: mantras) => {
  const { id } = data
  try {
    await prisma.ashtothras.delete({
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
    await deleteAshtothra(req.body)
    res.status(201).json({ message: 'Ashtothra deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
