import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const getDynamicHeader = async () => {
  try {
    const result = await prisma.dynamicHeader.findMany()

    return result
  } catch (err) {
    return err
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (id) {
    try {
      const singleDynamicHeader = await prisma.dynamicHeader.findUnique({ where: { id: Number(id) } })
      if (singleDynamicHeader) {
        res.status(201).json({ data: singleDynamicHeader })
      } else {
        res.status(404).json({ error: 'Global Search Module not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const result = await getDynamicHeader()

      res.status(200).json({ data: result })
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  }
}

export default handler
