import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const deleteTempleOfIndia = async (req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const templeOfIndia = await prisma.templeOfIndia.findFirst({ where: { id: req.body.id } })
    if (!templeOfIndia) {
      return res.status(400).json({ message: 'Temple of India not found' })
    } else {
      await prisma
        .templeOfIndia
        .delete({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Temple of India deleted successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) {
  try {
    await deleteTempleOfIndia(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}