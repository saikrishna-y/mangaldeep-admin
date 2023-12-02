import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface category {
  id: number
}

const deleteCategory = async (data: category) => {
  const { id } = data
  try {
    await prisma.editorialSubCategories.delete({
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
  const { id } = req.body
  if (!id) {
    res.status(500).send('Please select any one Subcategory to delete')
  } else {
    try {
      await deleteCategory(req.body)
      res.status(201).json({ message: 'Subcategory deleted successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
