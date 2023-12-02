import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface eventAttributes {
  id: number;
  language_id: number;
  locales: string;
  deity_id: number;
  name: string;
  short_description?: string;
  url: string;
  image_url: string;
  is_active: boolean;
}

const editTempleRaaga = async (req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const templeOfIndia = await prisma.templeOfIndia.findFirst({ where: { id: req.body.id } })
    if (!templeOfIndia) {
      return res.status(400).json({ message: 'Temple of India not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.templeOfIndia.update({
        where: { id },
        data: { ...rest }
      })
        .then(() => res.status(201).json({ message: 'Temple of India updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) {
  try {
    await editTempleRaaga(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}