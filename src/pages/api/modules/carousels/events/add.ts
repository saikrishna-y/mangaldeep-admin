import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface eventAttributes {
  name: string;
  description_text: string;
  url: string;
  display_order: number;
  festival_start_date: string;
  duration: string;
  venue: string;
  location_url?: string;
  cost?: string;
  tags?: string;
  languages?: string;
  age_limit?: string;
  other?: string;
  locales: [];
  image_url: string;
  image_urls: string[];
  description: string;
}

const addEvent = async (req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) => {
  if (
    !req.body.name ||
    !req.body.description_text ||
    !req.body.url ||
    !req.body.display_order ||
    !req.body.festival_start_date ||
    !req.body.locales ||
    req.body.locales.length <= 0 ||
    !req.body.duration ||
    !req.body.venue ||
    !req.body.image_url ||
    !req.body.image_urls ||
    req.body.image_urls.length <= 0 ||
    !req.body.description
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    await prisma
      .events
      .create({ data: req.body })
      .then(() => res.status(201).json({ message: 'Event created successfully' }))
      .catch((err: any) => {

        return res.status(400).json(err)
      })
  }
}

export default async function handler(req: ExtendedNextApiRequest<eventAttributes>, res: NextApiResponse) {
  try {
    await addEvent(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}