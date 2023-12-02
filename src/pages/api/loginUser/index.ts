import { NextApiRequest, NextApiResponse } from 'next/types'

import nextConnect from 'next-connect'
import auth from '../../../middleware/auth'
import passport from '../../../lib/passport'

const nextConnectFixed = nextConnect as any

interface MyRequest extends NextApiRequest {
  user: {}
}

const handler = nextConnectFixed()
console.log('step:0 - Login')
handler.use(auth).post(passport.authenticate('local'), (req: MyRequest, res: NextApiResponse) => {
  res.json({ user: req.user })
})

// const matchPassword = async (pass, userPass) => {
//   try {
//     const passwordMatch = await (pass === userPass)

//     return passwordMatch
//   } catch (err) {
//     return false
//   }
// }

// const verifyUserPassword = async (data: any) => {
//   const { username, password } = data
//   console.log('username,password', username, password)
//   try {
//     const user = await prisma.users.findUnique({
//       where: { mobile: username }
//     })
//     console.log('user', user)
//     if (!user) {
//       return 'User not found'
//     }

//     const testingPassword = await matchPassword(password, user.password)
//     console.log('testingPassword', testingPassword)
//     if (!testingPassword) {
//       return 'Incorrect Password'
//     }

//     return { user, message: 'Otp sent to registered email/mobile number' }
//   } catch (err) {
//     return err
//   }
// }

// export default async function handler(req: any, res: any) {
//   const { username, password } = req.body
//   console.log('req.body', req.body)

//   if (!req.body) {
//     res.status(400).send({ message: 'Request body cannot be empty' })
//   } else if (!username) {
//     res.status(400).send({ message: 'username is required' })
//   } else if (!password) {
//     res.status(400).send({ message: 'username is required' })
//   }

//   try {
//     const response = await verifyUserPassword(req.body)
//     console.log('response', response)

//     return res.status(200).send({ message: response })
//   } catch (err) {
//     console.log('err in catch', err)

//     return res.status(500).send({ message: err })
//   }
// }

export default handler
