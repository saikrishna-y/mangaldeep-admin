import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const getFestival = async () => {
  try {
    // const results = await prisma.festivals.findMany({
    //   include: {
    //     Images: true
    //   }
    // })

    // if (results.length > 0) {
    //   const finalData = []
    //   for (const d of results) {
    //     console.log(d.locales, 'saasdasdasadsads')
    //     const locales = await prisma.locales.findMany({
    //       where: {
    //         id: {
    //           in: JSON.parse(JSON.stringify(d.locales))
    //         }
    //       },
    //       include: {
    //         Language: true,
    //         Country: true,
    //         Location: true
    //       }
    //     })
    //     const params: any = { ...d }
    //     params.locales = locales
    //     finalData.push(params)
    //   }

    //   return finalData
    // } else {
    //   return results
    // }

    const results = await prisma.festivals.findMany({})

    return results
  } catch (err) {
    return err
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleFestival = await prisma.festivals.findUnique({ where: { id: Number(id) } })
      if (singleFestival) {
        const { locales, ...rest } = singleFestival
        console.log(locales)
        const localeData = []
        for (const locale of singleFestival?.locales?.split(", ")?.filter((e) => e !== "")) {
          const localeRecord = await prisma.locales.findFirst({ where: { name: locale } })
          localeData.push(localeRecord)
        }
        res.status(201).json({ data: { ...rest, locales: localeData } })
      } else {
        res.status(404).json({ error: 'Festival not found' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getFestival()
      if (response) {
        res.status(201).json(response)
      } else {
        res.status(400)
      }
    } catch (e: any) {
      res.status(500).send(e.toString())
    }
  }
}
