import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const getGlobalSearchModules = async () => {
  try {
    const result = await prisma.globalSearchModules.findMany()

    return result
  } catch (err) {
    return err
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (id) {
    try {
      const singleGlobalSearchModule = await prisma.globalSearchModules.findUnique({ where: { id: Number(id) } })
      if (singleGlobalSearchModule) {
        res.status(201).json({ data: singleGlobalSearchModule })
      } else {
        res.status(404).json({ error: 'Global Search Module not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const result = await getGlobalSearchModules()

      res.status(200).json({ data: result })
    } catch (err: any) {
      res.status(500).send(err)
    }
  }
}

export default handler
