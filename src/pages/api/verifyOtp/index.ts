import { NextApiRequest, NextApiResponse } from 'next/types'
import nextConnect from 'next-connect'
import { PrismaClient } from '@prisma/client'
import auth from 'src/middleware/auth'

const nextConnectFixed = nextConnect as any

interface VerifyOtpProps {
  otp: number
  user_id: number
}

const prisma = new PrismaClient()

const verifyOtp = async (data: VerifyOtpProps) => {
  const { otp, user_id } = data
  try {
    const user = await prisma.users.findUnique({ where: { id: user_id } })
    console.log('response in verify fun', user)
    const verified = await (otp === 123456)

    if (verified) {
      return { user, message: 'OTP verified successfully' }
    }
  } catch (err) {
    return err
  }
}

const handler = nextConnectFixed()
handler.use(auth).post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { otp, user_id } = req.body

  if (!req.body) {
    res.status(400).send('Request body cannot be empty')
  }
  if (!otp) {
    res.status(400).send({ message: 'OTP is required' })
  }
  if (!user_id) {
    res.status(400).send({ message: 'User ID is required' })
  }

  try {
    const response = await verifyOtp(req.body)
    console.log('response', response)
    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

export default handler
