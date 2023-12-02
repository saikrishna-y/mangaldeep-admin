import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */

// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// const getPuja = async () => {
//   const results = await prisma.puja.findMany({})

//   if (results.length > 0) {
//     const locales = await prisma.locales.findMany({
//       where: {
//         id: {
//           in: JSON.parse(JSON.stringify(results[0]?.locales))
//         }
//       },
//       include: {
//         Country: true,
//         Language: true,
//         Location: true
//       }
//     })
//     const pujaMaterials = await prisma.pujaMaterial.findMany({
//       where: {
//         puja_id: {
//           in: JSON.parse(JSON.stringify(results[0]?.id))
//         }
//       }
//     })
//     const deities = await prisma.deities.findMany({
//       where: {
//         id: {
//           in: JSON.parse(JSON.stringify(results[0]?.deities))
//         }
//       },
//       include: {
//         // Locales: true,
//       }
//     })
//     const festivals = await prisma.festivals.findMany({
//       where: {
//         id: {
//           in: JSON.parse(JSON.stringify(results[0]?.festivals))
//         }
//       },
//       include: {
//         // Locales: true
//       }
//     })
//     const weekdays = await prisma.weekDays.findMany({
//       where: {
//         id: {
//           in: JSON.parse(JSON.stringify(results[0]?.weekday))
//         }
//       }
//     })
//     const finalData = results.map(data => {
//       const locale = locales.map(d => {
//         return d
//       })
//       const festival = festivals.map(d => {
//         return d
//       })
//       const deity = deities.map(d => {
//         return d
//       })
//       const weekday = weekdays.map(d => {
//         return d
//       })
//       const pujaMaterialsData = pujaMaterials.map(d => {
//         return d
//       })

//       return {
//         ...data,
//         locales: locale,
//         festivals: festival,
//         deities: deity,
//         weekday: weekday,
//         pujaMaterials: pujaMaterialsData
//       }
//     })

//     return finalData
//   } else {
//     return results
//   }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = ''
    if (response) {
      res.status(201).json({ data: response })
    } else {
      res.status(400)
    }
  } catch (e: any) {
    res.status(500).send(e.toString())
  }
}
