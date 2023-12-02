import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface DynamicHeaderProps {
  name: string
  module_name: string
  locales: []
}

const addDynamicHeader = async (data: DynamicHeaderProps) => {
  const { name, module_name, locales } = data
  try {
    await prisma.dynamicHeader.create({
      data: {
        name,
        module_name,
        locales
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await addDynamicHeader(req.body)
    res.status(201).json({ message: 'Dynamic Header added successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
