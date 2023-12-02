import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

const getAbout = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  const results = await prisma.about.findMany()
  
  return res.status(200).json(results)

}

export default async function handler(req: ExtendedNextApiRequest<{}>, res: NextApiResponse) {
    
  const { id } = req.query

  if (id) {
    try {
      const singleAbout = await prisma.about.findUnique({ where: { id: Number(id) } })
      if (singleAbout) {
        res.status(201).json({ data: singleAbout })
      } else {
        res.status(404).json({ error: 'Data not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      await getAbout(req, res)
    } catch (e) {
      return res.status(400).json(e)
    }
  }
  }
