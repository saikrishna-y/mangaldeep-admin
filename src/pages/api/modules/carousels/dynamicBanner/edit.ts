import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface dynamicBannerAttributes {
  id: number
  module_name: number;
  title: string;
  display_order: number;
  is_new: boolean;
  description: string;
  locales: [],
  module_data: string;
  image_url: string;
  is_active: boolean;
}

const editDynamicBanner = async (req: ExtendedNextApiRequest<dynamicBannerAttributes>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const dynamicBanner = await prisma.dynamicBanner.findFirst({ where: { id: req.body.id } })
    if (!dynamicBanner) {
      return res.status(400).json({ message: 'Dynamic Banner not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.dynamicBanner.update({
        where: { id },
        data: { ...rest }
      })
        .then(() => res.status(201).json({ message: 'Dynamic Banner updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<dynamicBannerAttributes>, res: NextApiResponse) {
  try {
    await editDynamicBanner(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}