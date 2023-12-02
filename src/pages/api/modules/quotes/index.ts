import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getOnboardingQuotes = async () => {

  const results = await prisma.onboardingquotes.findMany({
    orderBy: {
      display_order: 'asc'
    }
  })

  return results

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleOnboardingQuote = await prisma.onboardingquotes.findUnique({ where: { id: Number(id) } })
      if (singleOnboardingQuote) {
        res.status(201).json({ data: singleOnboardingQuote })
      } else {
        res.status(404).json({ error: 'Onboarding quotes not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getOnboardingQuotes()
      if (response) {
        res.status(201).json(response)
      } else {
        res.status(400)
      }
    } catch (e: any) {
      res.status(500).send(e.toString())
    }
  }
}
