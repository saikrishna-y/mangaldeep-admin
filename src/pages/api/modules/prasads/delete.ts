import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const deletePrasad = async (req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const prasad = await prisma.prasad.findFirst({ where: { id: req.body.id } })
    if (!prasad) {
      return res.status(400).json({ message: 'Prasad not found' })
    } else {
      await prisma
        .prasad
        .delete({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Prasad deleted successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) {
  try {
    await deletePrasad(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}