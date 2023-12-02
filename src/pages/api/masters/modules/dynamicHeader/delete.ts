import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface DynamicHeader {
  id: number
}

const deleteDynamicHeader = async (data: DynamicHeader) => {
  const { id } = data
  try {
    await prisma.dynamicHeader.delete({
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
    await deleteDynamicHeader(req.body)
    res.status(200).json({ message: 'Dynamic Header deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
