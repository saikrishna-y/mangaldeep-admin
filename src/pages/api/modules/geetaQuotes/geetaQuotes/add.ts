import { NextApiRequest, NextApiResponse } from 'next/types'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface geet {
  geetaQuotes: {
    language_id: number;
    chapter: string;
    quote_number: string;
    geeta_quote: string;
    translation_text: string;
    display_order: number;
    locales: number[];
  }[]
}

const addGeetaQuotes = async (data: geet, res: NextApiResponse) => {
  if (!data.geetaQuotes || data.geetaQuotes.length == 0) return res.status(400).json({ message: 'Geeta Quotes are required' })
  await prisma
    .geetaQuotes
    .createMany({ data: data.geetaQuotes })
    .then(() => res.status(201).json({ message: 'Geeta Audio added successfully' }))
    .catch((err) => {

      return res.status(400).json(err)
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await addGeetaQuotes(req.body, res)
  } catch (e) {
    res.status(500).send(e)
  }
}