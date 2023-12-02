import { NextApiRequest, NextApiResponse } from 'next/types'

import { PrismaClient } from '@prisma/client'

import argon2 from 'argon2'

const prisma = new PrismaClient()

interface addUser {
  first_name: string
  second_name: string
  mobile: string
  email: string
  password: string
  is_admin: boolean
}

const addUser = async (data: addUser) => {
  const { first_name, second_name, email, password, is_admin } = data
  const encryptedPassword = await argon2.hash(password)
  console.log('encryptedPassword', encryptedPassword)
  try {
    const user_management = await prisma.users.create({
      data: {
        first_name: first_name,
        second_name: second_name,
        mobile: '8919113333',
        email: email,
        password: encryptedPassword,
        is_admin: is_admin,
        created_by: 'arun',
        updated_by: 'arun',
        deleted_by: 'asdas',
        location_id: 1,
        language_id: 1,
        role_id: 1,
        provider_id: 1,
        deleted_at: undefined
      }
    })

    console.log('user_management', user_management)

    return user_management
  } catch (err) {
    console.log('err in addusers', err)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await addUser(req.body)
    res.status(201).json({ message: 'User Added Successfully' })
  } catch (err) {
    res.status(500).send(err)
  }
}
