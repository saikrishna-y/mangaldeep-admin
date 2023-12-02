import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface language {
  id: number
}

const deletelanguage = async (data: language) => {
  const { id } = data
  try {
    await prisma.languages.delete({
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
    await deletelanguage(req.body)
    res.status(201).json({ message: 'language deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
