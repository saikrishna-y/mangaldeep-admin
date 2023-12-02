import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface dynamicBannerAttributes {
  module_name_id: number;
  title: string;
  display_order: number;
  is_new: boolean;
  description: string;
  locales: [],
  module_data: string;
  image_url: string;
  display_title: string;
}

const addDynamicBanner = async (req: ExtendedNextApiRequest<dynamicBannerAttributes>, res: NextApiResponse) => {
  if (
    !req.body.module_name_id ||
    !req.body.title ||
    !req.body.display_order ||
    !req.body.description ||
    !req.body.locales ||
    req.body.locales.length <= 0 ||
    !req.body.module_data ||
    !req.body.image_url
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    await prisma.dynamicBanner
      .create({ data: req.body })
      .then(() => res.status(201).json({ message: 'Dynamic Banner created successfully' }))
      .catch((err: any) => {
        return res.status(400).json(err)
      })
  }
}

export default async function handler(req: ExtendedNextApiRequest<dynamicBannerAttributes>, res: NextApiResponse) {
  try {
    await addDynamicBanner(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}
