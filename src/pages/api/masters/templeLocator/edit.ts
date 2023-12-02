import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface locator {
  keyword: string
  id: number
  locales: []
  deity_id: number
}

const editTempleLocator = async (data: locator) => {
  const { keyword, deity_id, locales, id } = data
  try {
    await prisma.templeLocator.update({
      where: { id },
      data: {
        keyword,
        locales,
        deity_id
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editTempleLocator(req.body)
    res.status(201).json({ message: 'Temple locator keyword updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
