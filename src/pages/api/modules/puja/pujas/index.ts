import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */

// import prisma from 'src/utlis/prisma'

// const getPuja = async () => {
//   const results = await prisma.puja.findMany({})

//   // if (results.length > 0) {
//   //     const locales = await prisma.locales.findMany({
//   //         where: {
//   //             id: {
//   //                 in: JSON.parse(JSON.stringify(d?.locales))
//   //             }
//   //         },
//   //         include: {
//   //             Country: true,
//   //             Language: true,
//   //             Location: true
//   //         }
//   //     })
//   // const pujaMaterials = await prisma.pujaMaterial.findMany({
//   //     where: {
//   //         puja_id: {
//   //             in: JSON.parse(JSON.stringify(d?.id))
//   //         }
//   //     }
//   // })
//   // const deities = await prisma.deities.findMany({
//   //     where: {
//   //         id: {
//   //             in: JSON.parse(JSON.stringify(d.deities))
//   //         }
//   //     },
//   //     include: {
//   //         Images: true,
//   //     }
//   // })
//   // const festivals = await prisma.festivals.findMany({
//   //     where: {
//   //         id: {
//   //             in: JSON.parse(JSON.stringify(d?.festivals))
//   //         }
//   //     },
//   //     include: {
//   //         Locales: true
//   //     }
//   // })
//   // const weekdays = await prisma.weekDays.findMany({
//   //     where: {
//   //         id: {
//   //             in: JSON.parse(JSON.stringify(d?.weekday))
//   //         }
//   //     },
//   // })
//   //     const finalData = results.map(data => {
//   //         const locale = locales.map(d => {
//   //             return d
//   //         })
//   //         const festival = festivals.map(d => {
//   //             return d
//   //         })
//   //         const deity = deities.map(d => {
//   //             return d
//   //         })
//   //         const weekday = weekdays.map(d => {
//   //             return d
//   //         })
//   //         const pujaMaterialsData = pujaMaterials.map(d => {
//   //             return d
//   //         })

//   //         return {
//   //             ...data,
//   //             locales: locale,
//   //             festivals: festival,
//   //             deities: deity,
//   //             weekday: weekday,
//   //             pujaMaterials: pujaMaterialsData
//   //         }
//   //     })

//   //     return finalData
//   // }
//   if (results.length > 0) {
//     const finalData = []
//     for (const d of results) {
//       const locales = await prisma.locales.findMany({
//         where: {
//           id: {
//             in: JSON.parse(JSON.stringify(d.locales))
//           }
//         },
//         include: {
//           Language: true,
//           Country: true,
//           Location: true
//         }
//       })
//       const pujaMaterials = await prisma.pujaMaterial.findMany({
//         where: {
//           puja_id: {
//             in: JSON.parse(JSON.stringify(d?.id))
//           }
//         }
//       })
//       const deities = await prisma.deities.findMany({
//         where: {
//           id: {
//             in: JSON.parse(JSON.stringify(d.deities))
//           }
//         },
//         include: {
//           Images: true
//         }
//       })
//       const festivals = await prisma.festivals.findMany({
//         where: {
//           id: {
//             in: JSON.parse(JSON.stringify(d?.festivals))
//           }
//         },
//         include: {
//           Images: true
//         }
//       })
//       const weekdays = await prisma.weekDays.findMany({
//         where: {
//           id: {
//             in: JSON.parse(JSON.stringify(d?.weekday))
//           }
//         }
//       })
//       const pujaType = await prisma.pujaType.findMany({
//         where: {
//           id: {
//             in: JSON.parse(JSON.stringify(d?.puja_type))
//           }
//         }
//       })
//       const params: any = { ...d }
//       params.locales = locales
//       params.pujaMaterials = pujaMaterials
//       params.weekday = weekdays
//       params.festivals = festivals
//       params.deities = deities
//       params.puja_type = pujaType
//       finalData.push(params)
//     }

//     return finalData
//   } else {
//     return results
//   }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = ''
    if (response) {
      res.status(201).json(response)
    } else {
      res.status(400)
    }
  } catch (e: any) {
    res.status(500).send(e.toString())
  }
}
