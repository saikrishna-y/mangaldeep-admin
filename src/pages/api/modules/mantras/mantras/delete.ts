import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface mantras {
  id: number
}

const deleteMantra = async (data: mantras) => {
  const { id } = data
  try {
    await prisma.mantras.delete({
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
    await deleteMantra(req.body)
    res.status(201).json({ message: 'mantra deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
