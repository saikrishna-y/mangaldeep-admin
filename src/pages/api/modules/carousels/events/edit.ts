import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient();

interface eventAttributes {
  id: number;
  name: string;
  description_text: string;
  url: string;
  display_order: number;
  festival_start_date?: string;
  duration: string;
  venue: string;
  location_url: string;
  cost?: string;
  tags?: string;
  languages?: string;
  age_limit?: string;
  other?: string;
  locales: [];
  image_url: string;
  image_urls: string[];
  description: string;
  is_active: boolean;
}

const editEvent = async (req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    const event = await prisma.events.findFirst({ where: { id: req.body.id } })
    if (!event) {
      return res.status(400).json({ message: 'Event not found' })
    } else {
      const { id, ...rest } = req.body
      await prisma.events.update({
        where: { id },
        data: { ...rest }
      })
        .then(() => res.status(201).json({ message: 'Event updated successfully' }))
        .catch((err: any) => {
          return res.status(400).json(err)
        })
    }
  }
}

export default async function handler(req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) {
  try {
    await editEvent(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}