import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface category {
  name: string
  display_order: string
  category_id: number
}

const addSubCategory = async (data: category) => {
  const { display_order, category_id, name } = data
  try {
    await prisma.editorialSubCategories.create({
      data: {
        display_order: parseInt(display_order),
        category_id,
        name
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { display_order, category_id, subcategory } = req?.body
  if (!category_id) {
    res.status(500).send('Category can not be empty')
  } else if (!display_order) {
    res.status(500).send('Display order can not be empty')
  } else if (subcategory?.length <= 0) {
    res.status(500).send('Subcategory can not be empty')
  } else {
    try {
      await addSubCategory(req.body)
      res.status(201).json({ message: 'Subcategory added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
