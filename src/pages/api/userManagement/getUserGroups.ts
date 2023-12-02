import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const getUserGroups = async (req: ExtendedNextApiRequest<{}>, res: NextApiResponse) => {
  await prisma
    .usergroups
    .findMany({ include: { Groups: true } })
    .then((userGroups) => {
      res.status(200).json({ data: userGroups })
    })
    .catch((err) => {

      return res.status(400).json(err)
    })
}

export default async function handler(req: ExtendedNextApiRequest<{}>, res: NextApiResponse) {
  try {
    await getUserGroups(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}