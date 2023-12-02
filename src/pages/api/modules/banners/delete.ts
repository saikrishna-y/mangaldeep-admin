import { NextApiRequest, NextApiResponse } from 'next/types'

import { PrismaClient } from '@prisma/client'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const deleteBanner = async (req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const banner = await prisma.banner.findFirst({ where: { id: req.body.id } })
    if (!banner) {
      return res.status(400).json({ message: 'Banner not found' })
    } else {
      await prisma.banner
        .delete({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Banner deleted successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) {
  try {
    await deleteBanner(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}
