import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'src/utlis/prisma'

const getShlokas = async () => {
  const results = await prisma.ashtothras.findMany({
    where: {
      is_active: true
    }
  })

  // if (results.length > 0) {
  //     const locales = await prisma.locales.findMany({
  //         where: {
  //             id: {
  //                 in: JSON.parse(JSON.stringify(d?.locales))
  //             }
  //         },
  //         include: {
  //             Country: true,
  //             Language: true,
  //             Location: true
  //         }
  //     })
  // const ashtothra_details = await prisma.ashtothra_Details.findMany({
  //     where: {
  //         ashtothras_id: {
  //             in: JSON.parse(JSON.stringify(d?.id))
  //         }
  //     }
  // })
  //     const finalData = results.map(data => {
  //         const locale = locales.map(d => {
  //             return d
  //         })
  //         const details = ashtothra_details.map(d => {
  //             return d
  //         })

  //         return {
  //             ...data,
  //             locales: locale,
  //             ashtothra_details: details
  //         }
  //     })

  //     return finalData
  // } else {
  if (results.length > 0) {
    const finalData = []
    for (const d of results) {
      console.log(d.locales, 'saasdasdasadsads')
      const locales = await prisma.locales.findMany({
        where: {
          id: {
            in: JSON.parse(JSON.stringify(d.locales))
          }
        },
      })
      const ashtothra_details = await prisma.ashtothraDetails.findMany({
        where: {
          ashtothras_id: {
            in: JSON.parse(JSON.stringify(d?.id))
          }
        }
      })
      const params: any = { ...d }
      params.locales = locales
      params.ashtothra_details = ashtothra_details
      finalData.push(params)
    }

    return finalData
  } else {
    return results
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await getShlokas()
    if (response) {
      res.status(201).json({ data: response })
    } else {
      res.status(400)
    }
  } catch (e: any) {
    res.status(500).send(e.toString())
  }
}
