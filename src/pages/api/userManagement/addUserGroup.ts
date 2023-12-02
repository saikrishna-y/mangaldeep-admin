import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface user {
  name: string
  email: string[]
}

// const createUsergroup = async (data: user) => {
//   const { name, email } = data
//   const results = await prisma.groups.create({
//     data: {
//       name: name
//     }
//   })

//   return results
// }

const createUsergroup = async (req: ExtendedNextApiRequest<user>, res: NextApiResponse) => {
  const group = await prisma.groups.findFirst({ where: { name: req.body.name } })
  if (!group) {
    const userIds = await prisma.users.findMany({ where: { email: { in: req.body.email } }, select: { id: true } })
    const newGroup = await prisma.groups.create({ data: { name: req.body.name } })
    await prisma
      .usergroups
      .createMany({
        data: userIds.map((d) => {
          return { user_id: d.id, group_id: newGroup.id, created_by: '' }
        })
      })
      .then(() => res.status(201).json({ message: 'User group created successfully' }))
      .catch((err) => {

        return res.status(400).json(err)
      })
  } else {
    return res.status(400).json({ message: 'This group already exists' })
  }
}

export default async function handler(req: ExtendedNextApiRequest<user>, res: NextApiResponse) {
  // try {
  //   const response = await createUsergroup(req.body)
  //   if (response) {
  //     res.status(201).json({ message: 'Password changed successfully' })
  //   } else {
  //     res.status(400).send('current password is mismatching')
  //   }
  // } catch (e: any) {
  //   res.status(500).send(e.toString())
  // }

  try {
    if (!req.body.name || !req.body.email || req.body.email.length == 0) {
      return res.status(400).json({ message: 'Enter all fields' })
    } else {
      await createUsergroup(req, res)
    }
  } catch (e) {
    return res.status(400).json(e)
  }
}
