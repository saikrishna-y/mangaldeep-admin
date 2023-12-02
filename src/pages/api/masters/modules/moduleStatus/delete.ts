import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface ModuleStatus {
  id: number
}

const deleteModuleStatus = async (data: ModuleStatus) => {
  const { id } = data
  try {
    await prisma.moduleStatus.delete({
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
  try {
    await deleteModuleStatus(req.body)
    res.status(200).json({ message: 'Module Status deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
