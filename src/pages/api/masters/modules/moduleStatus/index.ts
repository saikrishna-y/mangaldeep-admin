import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const getModuleStatus = async () => {
  try {
    const result = await prisma.moduleStatus.findMany()

    return result
  } catch (err) {
    return err
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (id) {
    try {
      const singleModuleStatus = await prisma.moduleStatus.findUnique({ where: { id: Number(id) } })
      if (singleModuleStatus) {
        res.status(201).json({ data: singleModuleStatus })
      } else {
        res.status(404).json({ error: 'Module Status not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const result = await getModuleStatus()

      res.status(200).json({ data: result })
    } catch (err: any) {
      res.status(500).send(err)
    }
  }
}

export default handler
