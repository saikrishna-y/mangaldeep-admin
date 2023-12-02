import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma"

interface language {
  module_name: string
  locales: []
  id: number
}

const editModuleStatus = async (data: language) => {
  const { module_name, locales, id } = data
  try {
    await prisma.moduleStatus.update({
      where: { id },
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
    await editModuleStatus(req.body)
    res.status(201).json({ message: 'Module Status edited successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
