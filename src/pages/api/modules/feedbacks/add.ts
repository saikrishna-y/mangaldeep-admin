import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface FeedbackAttributes {
  user_id: number | undefined
  device_token: string
  category_id: number
  commented_at: string
  mobile_number: number
  comments: string
  device_name: string
  device_type_id: string
  os_name: string
  os_version: string
  app_build: number
  app_version: number
  language_id: number
  location_id: number
  registration_id: number
  failed: number
  reconciled: boolean
  ios_notification_badge: number
}

const addFeedback = async (req: ExtendedNextApiRequest<FeedbackAttributes>, res: NextApiResponse) => {
  if (
    !req.body.user_id ||
    !req.body.device_token ||
    !req.body.category_id ||
    !req.body.commented_at ||
    !req.body.mobile_number ||
    !req.body.comments ||
    !req.body.device_name ||
    !req.body.os_name ||
    !req.body.os_version ||
    !req.body.app_build ||
    !req.body.app_version ||
    !req.body.language_id ||
    !req.body.location_id ||
    !req.body.registration_id ||
    !req.body.failed ||
    !req.body.ios_notification_badge
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    await prisma.feedback
      .findMany()
      .then(() => res.status(201).json({ message: 'Prasad created successfully' }))
      .catch((err: any) => {
        return res.status(400).json(err)
      })
  }
}

export default async function handler(req: ExtendedNextApiRequest<FeedbackAttributes>, res: NextApiResponse) {
  try {
    await addFeedback(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}
