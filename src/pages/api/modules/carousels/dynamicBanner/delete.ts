import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const deleteDynamicBanner = async (req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required' })
  } else {
    const dynamicBanner = await prisma.dynamicBanner.findFirst({ where: { id: req.body.id } })
    if (!dynamicBanner) {
      return res.status(400).json({ message: 'Dynamic Banner not found' })
    } else {
      await prisma
        .dynamicBanner
        .delete({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Dynamic Banner deleted successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<{ id: number }>, res: NextApiResponse) {
  try {
    await deleteDynamicBanner(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}