import { NextApiRequest, NextApiResponse } from 'next/types'
/* eslint-disable newline-before-return */
import argon2 from 'argon2'

import jwt from 'jsonwebtoken'

interface MyResponse extends NextApiResponse {
  status: (statusCode: number) => MyResponse
}

export default async function handler(req: NextApiRequest, res: MyResponse) {
  const userLogin = async () => {
    const { body } = req
    const { name, password } = body
    const encryptedPassword = await argon2.hash(password)

    // const encryptedPassword = bcrypt.hashSync('B4c0//', salt) //to do api call to get the pass from db
    const mock = encryptedPassword //mock will the pass stored in db
    if (mock == encryptedPassword) {
      const token = jwt.sign({ name }, 'mangaldeep-admin')
      return token //to do store the token in token
    } else {
    }
  }

  try {
    const response = await userLogin()
    res.status(200).send(response)
  } catch (err) {}
}

// res.status(200).json({ name: 'Successfully Loaded' })
