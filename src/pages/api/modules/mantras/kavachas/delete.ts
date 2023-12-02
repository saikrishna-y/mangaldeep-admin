import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface kavachas {
  id: number
}

const deleteKavachas = async (data: kavachas) => {
  const { id } = data
  try {
    await prisma.kavachas.delete({
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
    await deleteKavachas(req.body)
    res.status(201).json({ message: 'kavachas deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
