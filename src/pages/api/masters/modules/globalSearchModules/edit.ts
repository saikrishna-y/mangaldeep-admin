import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma"

interface globalSearchModules {
  module_name: string
  display_order: string
  id: number
}

const editGlobalSearchModules = async (data: globalSearchModules) => {
  const { module_name, display_order, id } = data
  try {
    await prisma.globalSearchModules.update({
      where: { id },
      data: {
        module_name,
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
    await editGlobalSearchModules(req.body)
    res.status(201).json({ message: 'Global Search Modules updated successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
