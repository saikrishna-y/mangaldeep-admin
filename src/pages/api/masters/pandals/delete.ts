import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface pandal {
  id: number
}

const deletePandal = async (data: pandal) => {
  const { id } = data
  try {
    await prisma.pandals.delete({
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
  const { id } = req.body
  if (!id) {
    res.status(500).send('Please select any one Pandal to delete')
  } else {
    try {
      await deletePandal(req.body)
      res.status(201).json({ message: 'Pandal deleted successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
