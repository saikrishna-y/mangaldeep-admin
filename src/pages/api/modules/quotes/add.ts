import { NextApiRequest, NextApiResponse } from 'next/types'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface onboardingQuotes {
  description: any[]
}

const addOnboardingQuotes = async (data: onboardingQuotes) => {

  const { description } = data
  try {
    const count = await prisma.onboardingquotes.count()
    if (description.length > 0) {
      for (const quote of description) {
        await prisma.onboardingquotes.create({
          data: {
            display_order: quote.order + count,
            description: quote.name
          }
        });
      }
    }

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req?.body) {
    res.status(500).send('Fields can not be empty')
  } else {
    try {
      await addOnboardingQuotes(req.body)
      res.status(201).json({ message: 'Onboarding quotes added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
