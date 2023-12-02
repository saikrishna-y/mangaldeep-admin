import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient()

interface user {
  name: string
  email: string
}

const createUsergroup = async (data: user) => {
  const { name, email } = data
  const results = await prisma.groups.create({
    data: {
      name: name
    }
  })

  return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await createUsergroup(req.body)
    if (response) {
      res.status(201).json({ message: 'Password changed successfully' })
    } else {
      res.status(400).send('current password is mismatching')
    }
  } catch (e: any) {
    res.status(500).send(e.toString())
  }
}
