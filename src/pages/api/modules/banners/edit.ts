import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface bannerAttributes {
  id: number;
  name: string;
  locales: string;
  image_urls: []
  is_active: boolean;
}

const editBanner = async (req: ExtendedNextApiRequest<bannerAttributes>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const banner = await prisma.banner.findFirst({ where: { id: req.body.id } })
    if (!banner) {
      return res.status(400).json({ message: 'Banner not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.banner.update({
        where: { id },
        data: { ...rest }
      })
        .then(() => res.status(201).json({ message: 'Banner updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<bannerAttributes>, res: NextApiResponse) {
  try {
    await editBanner(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}