import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface Chalisas {
  id: number
}

const deleteeditGeetAudio = async (data: Chalisas) => {
  const { id } = data
  try {
    await prisma.geetaAudio.delete({
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
    await deleteeditGeetAudio(req.body)
    res.status(201).json({ message: 'Geet quote audio deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
