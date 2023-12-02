import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface pushNotificationsAttributes {
  header_text: string
  message_text: string
  image_url?: string
  send_type: string
  language_id?: number
  location_id?: number
  user_details?: string
  deep_linking?: boolean
}

const addPushNotofication = async (req: ExtendedNextApiRequest<pushNotificationsAttributes>, res: NextApiResponse) => {
  if (!req.body.header_text || !req.body.message_text || !req.body.send_type) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    await prisma.pushNotification
      .create({ data: req.body })
      .then(() => res.status(201).json({ message: 'Notification created successfully' }))
      .catch((err: any) => {

        return res.status(400).json(err)
      })
  }
}

export default async function handler(req: ExtendedNextApiRequest<pushNotificationsAttributes>, res: NextApiResponse) {
  try {
    await addPushNotofication(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}
