import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body

  if (!id) {
    res.status(401).send('Error deity id cannot be empty')
  }

  try {
    await prisma.deitie.delete({ where: { id: id } })
    res.status(200).send(`Deity with id ${id} deleted successfuly`)
  } catch (err: unknown) {
    res.status(500).send({ message: err || 'Error deleting the deity' })
  }
}

export default handler
