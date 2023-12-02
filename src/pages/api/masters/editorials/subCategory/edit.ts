import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface album {
  display_order: number
  id: number
  category_id: number
  name: string
}

const editCategory = async (data: album) => {
  const { id, display_order, category_id } = data
  try {
    await prisma.editorialSubCategories.update({
      where: { id },
      data: {
        display_order,
        category_id,
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editCategory(req.body)
    res.status(201).json({ message: 'Subcategory updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
