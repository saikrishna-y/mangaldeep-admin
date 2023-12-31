import { PrismaClient } from '@prisma/client'

// declare global {
//   var prisma: any
// }

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace NodeJS {
//     interface Global {
//       prisma: PrismaClient
//     }
//   }
// }

// let global: any

const prisma = new PrismaClient()

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient()
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient()
//   }

//   prisma = global.prisma
// }

export default prisma
