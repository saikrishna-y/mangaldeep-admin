import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const getNotificationMessages = async () => {
  try {
    const results = await prisma.notificationMessages.findMany()

    return results
  } catch (err) {

    return err
  }
}

const handler = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  const { id } = req.query

  if (id) {
    try {
      const singleNotificationMessage = await prisma.notificationMessages.findUnique({ where: { id: Number(id) } })
      if (singleNotificationMessage) {
        res.status(200).send({ data: singleNotificationMessage })
      } else {
        res.status(400).send('Error retrieving data from notiification messages')
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getNotificationMessages()
      res.status(200).send({ data: response })
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

export default handler
