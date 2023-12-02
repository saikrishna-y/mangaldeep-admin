import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface aboutAttributes {
  id: number;
  description: string;
}

const editAbout = async (req: ExtendedNextApiRequest<aboutAttributes>, res: NextApiResponse) => {
  
  const { id, description} = req.body
  if (
    !id ||
    !description
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const about = await prisma.about.findFirst({ where: { id: id } })
    
    if (!about) {
      return res.status(400).json({ message: 'Data not found' })
    } else {
      await prisma.about.update({
        where: { id },
        data: { description }
      })
        .then(() => res.status(201).json({ message: 'About updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<aboutAttributes>, res: NextApiResponse) {
  try {
    await editAbout(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}