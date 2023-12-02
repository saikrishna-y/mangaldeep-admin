import { NextApiRequest } from 'next/types'
import argon2 from 'argon2'

interface FindUserByUsername {
  req?: NextApiRequest
  username: string
}

interface ValidatePasswordProps {
  user: {
    password: string
  }
  inputPassword: string
}

console.log('Step 8: Inside db file')

export async function findUserByUsername({ username }: FindUserByUsername) {
  console.log('Step 9: Inside db - findUsername')

  console.log(username)

  // const prisma = new PrismaClient()

  // try {
  //   const user = await prisma.users.findUnique({
  //     where: { email: username }
  //   })

  //   if (!user) {
  //     return 'User not found'
  //   } else {
  //     return user
  //   }
  // } catch (err) {
  //   throw new Error('Session expired')
  // }

  // Here you find the user based on id/username in the database
  // const user = await db.findUserById(id)
  // return req.session.users.find(user => user.username === username)

  return null
}

// Compare the password of an already fetched user (using `findUserByUsername`) and compare the
// password for a potential match
export async function validatePassword({ user, inputPassword }: ValidatePasswordProps) {
  console.log('Step 10: Inside db - validatePassword')

  const passwordsMatch = await argon2.verify(user?.password ?? '', inputPassword)

  return passwordsMatch
}
