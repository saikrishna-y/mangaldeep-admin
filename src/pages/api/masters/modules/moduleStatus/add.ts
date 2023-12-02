import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface moduleStatusProps {
  module_name: string
  locales: []
}

const addModuleStatus = async (data: moduleStatusProps) => {
  const { module_name, locales } = data
  try {
    await prisma.moduleStatus.create({
      data: {
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
    await addModuleStatus(req.body)
    res.status(201).json({ message: 'Module Status added successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
