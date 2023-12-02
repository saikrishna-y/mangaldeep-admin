import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

const getEditorials = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  const results = await prisma.editorials.findMany({})
  console.log('innside getEditorials')
  if (results.length > 0) {
    const finalData = [];
    for (const d of results) {
      const locales = await prisma.locales.findMany({
        where: {
          id: {
            in: JSON.parse(JSON.stringify(d.locales))
          }
        }
      })
      const params = { ...d, locales }
      params.locales = locales
      finalData.push(params)
    }

    return res.status(200).json(finalData)
  }

  return res.status(200).json(results)

}

export default async function handler(req: ExtendedNextApiRequest<{}>, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleEditorial = await prisma.editorials.findUnique({ where: { id: Number(id) } })
      if (singleEditorial) {
        res.status(201).json({ data: singleEditorial })
      } else {
        res.status(404).json({ error: 'Editorial not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      await getEditorials(req, res)
    } catch (e) {
      return res.status(400).json(e)
    }
  }
}