import nextConnect from 'next-connect'

// import passport from '../lib/passport'
// import session from '../lib/session'
// import { NextApiResponse } from 'next/types'

const nextConnextFixed = nextConnect as any

// interface RequestProps {
//   req: {
//     session: {
//       users: []
//     }
//   }
// }

// interface RequestBodyProps {
//   req: RequestProps
//   res: NextApiResponse
//   next: () => void
// }

console.log('Step 1: Inside auth middleware')

const auth = nextConnextFixed()

// .use(
//   session({
//     name: 'sess',
//     secret: process.env.TOKEN_SECRET,
//     cookie: {
//       maxAge: 60 * 60 * 8, // 8 hours,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       path: '/',
//       sameSite: 'lax'
//     }
//   })
// )
// .use(({ req, next }: RequestBodyProps) => {
//   console.log('Step 2: Inside auth middleware - .use() function')

//   // Initialize mocked database
//   // Remove this after you add your own database
//   req.session.users = req.session.users || []
//   next()
// })
// .use(passport.initialize())
// .use(passport.session())

export default auth
