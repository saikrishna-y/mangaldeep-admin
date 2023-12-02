import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface DynamicHeaderProps {
  name: string
  module_name: string
  locales: []
  id: number
}

const editDynamicHeader = async (data: DynamicHeaderProps) => {
  const { name, module_name, locales, id } = data
  try {
    await prisma.dynamicHeader.update({
      where: { id },
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
    await editDynamicHeader(req.body)
    res.status(201).json({ message: 'Dynamic Header edited successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
