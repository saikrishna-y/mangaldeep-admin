import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface locale {
  id: number
}

const deleteLocale = async (data: locale) => {
  const { id } = data
  try {
    await prisma.locales.delete({
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
    await deleteLocale(req.body)
    res.status(201).json({ message: 'Locale deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
