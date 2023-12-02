import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface panchank {
  id: number
}

const deletePanchank = async (data: panchank) => {
  const { id } = data
  try {
    await prisma.dainikpanchang.delete({
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
    await deletePanchank(req.body)
    res.status(201).json({ message: 'Dainik panchang deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
