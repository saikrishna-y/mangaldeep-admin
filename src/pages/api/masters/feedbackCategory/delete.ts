import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface feedbackCategoryProps {
  id: number
}

const deleteFeedbackCategory = async (data: feedbackCategoryProps) => {
  const { id } = data
  try {
    await prisma.feedbackCategory.delete({
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
    await deleteFeedbackCategory(req.body)
    res.status(201).json({ message: 'Feedback Category deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
