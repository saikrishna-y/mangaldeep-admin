import { NextApiResponse } from 'next/types'
import { parse, serialize } from 'cookie'
import { createLoginSession, getLoginSession } from './auth'

// interface SessionProps {
//   name: string
//   secret: string
//   cookie: any
// }

interface cookies {
  cookies: {}
}
interface SessionProps {
  session: {
    passport: {
      user: {
        user_id: number
        is2FA: boolean
      }
    },
    maxAge: any
  }
  url: string
  cookies: cookies
  headers: { cookie: '' }
  name: string
  secret: string
  cookie: any
}

interface MyRequest extends NextApiResponse {
  end: any
}

interface RequestBodyProps {
  req: SessionProps

  // res: NextApiResponse
  res: MyRequest
  next: () => void
}

console.log('Step 11: Inside session file')

export function parseCookies(req: SessionProps) {
  console.log('Step 13: Inside session file - inside parseCookies', req.cookies)

  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie

  return parse(cookie || '')
}

export default function session({ name, secret, cookie: cookieOpts }: SessionProps) {
  return async ({ req, res, next }: RequestBodyProps) => {
    console.log('Step 12: Inside session file')

    const cookies: any = parseCookies(req)

    const token = cookies[name]
    let unsealed: any = {}

    if (token) {
      console.log('Step 14: Inside session file - token')
      try {
        // the cookie needs to be unsealed using the password `secret`
        unsealed = await getLoginSession({ token, secret })
      } catch (e) {
        // The cookie is invalid
      }
    }

    // req.session = unsealed
    req.session = unsealed

    const hasSession = req.session && req.session.passport
    const hasUserSession = req.session.passport?.user
    const verifyOtpRoute = req.url === '/api/verifyOtp/'

    if (hasSession && hasUserSession && verifyOtpRoute) {
      req.session.passport.user.is2FA = true
    }
    console.log('req.session after decode', req.session)

    // We are proxying res.end to commit the session cookie
    const oldEnd = res.end
    res.end = async function resEndProxy([...args]) {
      if (res.finished || res.writableEnded || res.headersSent) return
      if (cookieOpts.maxAge) {
        req.session.maxAge = cookieOpts.maxAge
      }

      const token = await createLoginSession({ session: req.session, secret })
      console.log('Step 15: Inside session file - created session')
      res.setHeader('Set-Cookie', serialize(name, token, cookieOpts))
      oldEnd.apply(this, args)
    }

    next()
  }
}
