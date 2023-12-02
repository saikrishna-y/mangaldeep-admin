import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (!id) {
    return res.status(400).send('Festival id is required')
  }
  if (!req.body) {
    return res.status(400).send('Requested data cannot be empty')
  }

  try {
    await prisma.festivals.update({ where: { id: Number(id) }, data: req.body })

    res.status(200).send(`Festival with id ${id} updated successfully`)
  } catch (err) {
    res.status(500).send({ message: err || 'Error while updating the festival' })
  }
}

export default handler
