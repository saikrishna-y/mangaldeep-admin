import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient()

interface password {
  current_password: string
  new_password: string
  confirm_new_password: string
}

const changePassword = async (data: password) => {
  const { current_password, new_password, confirm_new_password } = data
  const user_id = 5
  console.log('current_password, new_password---->', current_password, new_password, confirm_new_password)

  if (current_password === new_password) {
    throw new Error('Current password and new password cannot be same')
  }
  if (new_password !== confirm_new_password) {
    throw new Error('New password and confirm new password is mismatching')
  }

  const getPassword = async () => {
    const results = await prisma.users.findUnique({
      where: {
        id: user_id
      }
    })
    const isSame = await argon2.verify(results?.password ?? '', current_password)
    console.log('isSame in changepassword', isSame)

    return isSame
  }
  const isSamePassword = await getPassword()
  if (isSamePassword) {
    const encryptedPassword = await argon2.hash(new_password)
    const pasword_reset = await prisma.users.update({
      where: {
        id: user_id
      },
      data: {
        password: encryptedPassword
      }
    })

    return true
  } else {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await changePassword(req.body)
    if (response) {
      res.status(201).json({ message: 'Password changed successfully' })
    } else {
      res.status(400).send('current password is mismatching')
    }
  } catch (e: any) {
    res.status(500).send(e.toString())
  }
}
