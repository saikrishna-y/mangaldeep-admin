import { NextApiRequest, NextApiResponse } from 'next/types'
import nextConnect from 'next-connect'
import auth from 'src/middleware/auth'

const nextConnectFixed = nextConnect as any

interface MyRequest extends NextApiRequest {
  session: {}
}

const handler = nextConnectFixed()

handler.use(auth)
handler.get(async (req: MyRequest, res: NextApiResponse) => {
  console.log('request and response in init', req.session, res)

  return await res.json(req.session)
})

export default handler
