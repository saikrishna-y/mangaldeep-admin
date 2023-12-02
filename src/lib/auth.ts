import Iron from '@hapi/iron'

interface CreateLoginSessionProps {
  session: {}
  secret: string
}

interface GetLoginSessionProps {
  token: string
  secret: string
}

console.log('Step 16: Inside lib file')

export async function createLoginSession({ session, secret }: CreateLoginSessionProps) {
  console.log('Step 17: Inside lib file - createLoginSession')

  const createdAt = Date.now()
  const obj = { ...session, createdAt }
  const token = await Iron.seal(obj, secret, Iron.defaults)

  console.log('Step 17.1: Inside lib file - createLoginSession - token')
  console.log(token)

  return token
}

export async function getLoginSession({ token, secret }: GetLoginSessionProps) {
  console.log('Step 18: Inside lib file - getLoginSession')

  const session = await Iron.unseal(token, secret, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (session.maxAge && Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session
}
