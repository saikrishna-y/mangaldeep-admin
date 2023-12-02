import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const deleteMandaldeepGeet = async (req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const mangaldeepGeet = await prisma.mangaldeepGeet.findFirst({ where: { id: req.body.id } })
    if (!mangaldeepGeet) {
      return res.status(400).json({ message: 'Mangaldeep Geet not found' })
    } else {
      await prisma
        .mangaldeepGeet
        .delete({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Mangaldeep Geet deleted successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) {
  try {
    await deleteMandaldeepGeet(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}