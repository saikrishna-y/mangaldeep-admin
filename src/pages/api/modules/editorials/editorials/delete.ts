import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const deleteEditorial = async (req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const editorial = await prisma.editorials.findFirst({ where: { id: req.body.id } })
    if (!editorial) {
      return res.status(400).json({ message: 'Editorial not found' })
    } else {
      await prisma
        .editorials
        .delete({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Editorial deleted successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) {
  try {
    await deleteEditorial(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}