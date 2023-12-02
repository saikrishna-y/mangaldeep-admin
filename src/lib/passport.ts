
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { findUserByUsername, validatePassword } from './db'
import { PrismaClient } from '@prisma/client'

// interface SerializeUserProps {
//   user: { id: number }
//   done: () => void
// }

// interface LocalStrategyProps {
//   req: NextApiRequest
//   username: string
//   password: string
//   done: () => void
// }

type User = {
  id?: number
}

console.log('Step 3: Inside passport file')

passport.serializeUser((user: User, done) => {
  console.log('Step 4: Inside passport file - passport.serializeUser()')

  // serialize the username into session
  done(null, { id: user.id, is2FA: false });
});

passport.deserializeUser(async function (req: any, userData: any, done: any) {
  console.log('Step 4: Inside passport file - passport.deserializeUser()')
  const prisma = new PrismaClient()
  const { id } = userData

  try {
    const findUser = await prisma.users.findUnique({ where: { id: id } })
    console.log('findUser', findUser)

    if (findUser) {
      // deserialize the username back into user object
      // const user = await findUserByUsername({ username: findUser.email })
      // done(null, user)
    } else {
      done(null, null)
    }
  } catch (err) {
    return err
  }
})

passport.use(
  new LocalStrategy({ passReqToCallback: true }, async ({ username, password, done }: any) => {
    console.log('Step 5: Inside passport file - passport.use() LocalStrategy')

    // Here you lookup the user in your DB and compare the password/hashed password
    const user = await findUserByUsername({ username })

    const userPassword = await validatePassword({ user: { password }, inputPassword: password })

    // Security-wise, if you hashed the password earlier, you must verify it
    // if (!user || await argon2.verify(user.password, password))
    if (!user || !userPassword) {
      console.log('Step 6: Inside passport file - if condition')

      return done(null, false, { message: 'Incorrect username or password' })
    } else {
      console.log('Step 6: Inside passport file - else condition')

      done(null, user)
    }
  })
)

export default passport
