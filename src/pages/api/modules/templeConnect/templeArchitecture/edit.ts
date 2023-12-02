import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface templeArchitectureAttributes {
  id: number;
  language_id: number;
  locales: string;
  name: string;
  short_description?: string;
  url: string;
  duration: string;
  is_android?: boolean;
  is_ios?: boolean;
  image_url: string;
  temple_description?: string;
  is_active: boolean;
}

const editTempleArchitecture = async (req: ExtendedNextApiRequest<templeArchitectureAttributes>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const templeArchitecture = await prisma.templeArchitecture.findFirst({ where: { id: req.body.id } })
    if (!templeArchitecture) {
      return res.status(400).json({ message: 'Temple Architecture not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.templeArchitecture.update({
        where: { id },
        data: { ...rest }
      })
        .then(() => res.status(201).json({ message: 'Temple Architecture updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<templeArchitectureAttributes>, res: NextApiResponse) {
  try {
    await editTempleArchitecture(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}