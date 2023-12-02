import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface feedback {
  name: string
  language_id: number
  display_order: number
  id: number
}

const editFeedbackCategory = async (data: feedback) => {
  const { name, language_id, display_order, id } = data
  try {
    await prisma.feedbackCategory.update({
      where: { id },
      data: {
        name,
        language_id,
        display_order
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editFeedbackCategory(req.body)
    res.status(201).json({ message: 'Feedback category updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
