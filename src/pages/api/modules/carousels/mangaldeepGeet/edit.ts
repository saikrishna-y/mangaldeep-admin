import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface mangaldeepGeetAttributes {
  id: number
  name: string;
  short_desc: string;
  deity_id: number;
  mangaldeep_geet_cat_id: number;
  is_second_carousel: boolean;
  is_android: boolean;
  is_ios: boolean;
  url: string;
  duration: string;
  locales: string;
  image_url: string;
  song_desc: string;
  is_active: boolean;
}

const editMangaldeepGeet = async (req: ExtendedNextApiRequest<mangaldeepGeetAttributes>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const mangaldeepGeet = await prisma.mangaldeepGeet.findFirst({ where: { id: req.body.id } })
    if (!mangaldeepGeet) {
      return res.status(400).json({ message: 'Mangaldeep Geet not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.mangaldeepGeet.update({
        where: { id },
        data: { ...rest }
      })
        .then(() => res.status(201).json({ message: 'Mangaldeep Geet updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<mangaldeepGeetAttributes>, res: NextApiResponse) {
  try {
    await editMangaldeepGeet(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}