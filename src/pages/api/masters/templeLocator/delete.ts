import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface templeLocator {
  id: number
}

const deleteTempleLocator = async (data: templeLocator) => {
  const { id } = data
  try {
    await prisma.templeLocator.delete({
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
    res.status(500).send('Please select any one temple locator keyword to delete')
  } else {
    try {
      await deleteTempleLocator(req.body)
      res.status(201).json({ message: 'Temple locator keyword deleted successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
