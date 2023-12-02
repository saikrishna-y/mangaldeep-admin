import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

const getEvents = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  const results = await prisma.events.findMany()
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
      const params: any = { ...d }
      params.locales = locales
      finalData.push(params)
    }

    return res.status(200).json(finalData)
  } else {
    return res.status(200).json(results)
  }
}

const getSingleEvent = async (req: any, res: NextApiResponse) => {
  await prisma
    .events
    .findUnique({ where: { id: parseInt(req.query.id) } })
    .then((singleEvent) => {
      res.status(200).json({ data: singleEvent })
    })
    .catch((err) => {
      return res.status(400).json(err)
    })
}

export default async function handler(req: ExtendedNextApiRequest<{}>, res: NextApiResponse) {
  try {
    if (req.query.id) {
      await getSingleEvent(req, res)
    } else {
      await getEvents(req, res)
    }
  } catch (e) {
    return res.status(400).json(e)
  }
}