import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const deleteTempleArchitecture = async (req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const templeArchitecture = await prisma.templeArchitecture.findFirst({ where: { id: req.body.id } })
    if (!templeArchitecture) {
      return res.status(400).json({ message: 'Temple Architecture not found' })
    } else {
      await prisma
        .templeArchitecture
        .delete({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Temple Architecture deleted successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) {
  try {
    await deleteTempleArchitecture(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}