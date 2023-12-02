
import nextConnect from 'next-connect'

// import type { NextRequest, NextFetchEvent } from "next/server";

// import { createEdgeRouter } from "next-connect";
import auth from './middleware/auth'

// interface MyRequest extends NextApiRequest {
//   session: {}
// }

const authenticatedUser = () => {
  // console.log('Inside authenticatedUser', req.session)
}

// const middleware = nextConnect()
// const middleware = createEdgeRouter<NextRequest, NextFetchEvent>();
const middleware = nextConnect()
middleware.use(auth)
middleware.use(authenticatedUser)

export default middleware
