import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'src/utlis/prisma'

const getSubCategory = async () => {
  const results = await prisma.editorialSubCategories.findMany({})

  return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleEditorialSubcategory = await prisma.editorialSubCategories.findUnique({ where: { id: Number(id) } })
      if (singleEditorialSubcategory) {
        res.status(201).json({ data: singleEditorialSubcategory })
      } else {
        res.status(404).json({ error: 'Editorial subcategory not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getSubCategory()
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
