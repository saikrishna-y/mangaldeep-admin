import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface onboardingQuotes {
  id: number
}

const deleteOnboardingQuotes = async (data: onboardingQuotes) => {
  const { id } = data
  try {
    await prisma.onboardingquotes.delete({
      where: {
        id
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await deleteOnboardingQuotes(req.body)
    res.status(201).json({ message: 'Onboarding Quotes deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
