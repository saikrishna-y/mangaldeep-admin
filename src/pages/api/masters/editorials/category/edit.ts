import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface album {
  name: string
  display_order: string
  image_id: number
  locales: string;
  id: number
}

const editCategory = async (data: album) => {
  const { id, name, display_order, locales } = data
  try {
    await prisma.editorialCategories.update({
      where: { id },
      data: {
        display_order: parseInt(display_order),
        locales,
        name
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
    res.status(201).json({ message: 'Category updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
