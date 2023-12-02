import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface eventAttributes {
  id: number;
  category_id: number;
  subcategory_id: number;
  title: string;
  keywords: string;
  editorial_date: string;
  short_description: string;
  share_url: string;
  image_id: number;
  locales: string;
  is_active: boolean;
}

const editEditorial = async (req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const editorial = await prisma.editorials.findFirst({ where: { id: req.body.id } })
    if (!editorial) {
      return res.status(400).json({ message: 'Editorial not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.editorials.update({
        where: { id },
        data: { ...rest }
      })
        .then(() => res.status(201).json({ message: 'Editorial updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) {
  try {
    await editEditorial(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}