import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

const getPushNotifications = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  await prisma.pushNotification.findMany({
    include: {
      Language: true,
      Location: true
    }
  })
    .then((results) => res.status(200).json(results))
    .catch((err: any) => { return res.status(400).json(err) })
}

export default async function handler(req: ExtendedNextApiRequest<{}>, res: NextApiResponse) {
  try {
    await getPushNotifications(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}