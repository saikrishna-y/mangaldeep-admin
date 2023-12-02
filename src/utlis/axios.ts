import axios from 'axios'

const client: any = axios.create({
  // baseURL: "https://api.jsonbin.io/v3",
  baseURL: process.env.BASE_URL,

  // timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json',
    'X-Master-Key': '$2b$10$W04ZB2u2j1eoe7G1ndoEAOliyJ/.ANz/4eIKHqYS28qoXVmBzY/8q',
    'X-Access-Key': '$2b$10$/wMkcMy7KXbR4.t9sJiqyezD56JRcfHhmWEiIzn/eEGoExf9ynbLS'
  }
})

// client.setJwtToken = newToken => {
//  token = newToken;
// };

client.setSessionId = (SessionId: any) => {
  console.log('setSessionId => SessionId =>', SessionId)

  //  session = SessionId
}

client.interceptors.request.use(
  (request: any) => requestHandler(request, 'server'),
  (error: any) => errorHandler(error, 'server')
)

client.interceptors.response.use(
  (response: any) => responseHandler(response),
  (error: any) => errorHandler(error, 'server')
)

const requestHandler = (request: any, type: any) => {
  console.log(type)

  // if (token && !blacklist.includes(request.url)) {
  //  request.headers.Authorization = `Bearer ${token}`;
  // }
  return request
}

const responseHandler = (response: any) => {
  return response
}

const errorHandler = (error: any, type: any) => {
  console.log(type)

  const isUnauthorized = error?.response?.status === 401
  if (isUnauthorized) return Promise.reject(error)
}

// const clearSession = () => {
//  client
//      .post("/api/signout/signout")
//      .then(response => {
//          if (response.status === 200) {
//              toast.error("You're Session Has Expired");
//              setTimeout(() => (window.location = "/"), 2000);
//          }
//      })
//      .catch(err => {
//
//      });
// };

export { client }
