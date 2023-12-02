import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body

  if (!id) {
    res.status(401).send('Error id cannot be empty')
  }

  try {
    await prisma.festivals.delete({ where: { id: parseInt(id) } })
    res.status(200).send('Festival deleted successfully')
  } catch (err: unknown) {
    res.status(500).send({ message: err || 'Error deleting the festival' })
  }
}

export default handler
