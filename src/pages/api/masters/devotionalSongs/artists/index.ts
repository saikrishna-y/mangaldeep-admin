import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'src/utlis/prisma'

const getAllArtists = async () => {
  // const results = await prisma.artists.findMany({
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
  const results = await prisma.artists.findMany({})

  return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleArtist = await prisma.artists.findUnique({ where: { id: Number(id) } })
      if (singleArtist) {
        const { locales, ...rest } = singleArtist
        const localeData = []
        for (const locale of singleArtist?.locales?.split(", ")?.filter((e) => e !== "")) {
          const localeRecord = await prisma.locales.findFirst({ where: { name: locale } })
          localeData.push(localeRecord)
        }
        const alteredData = { ...rest, locales: localeData }
        res.status(200).json({ data: alteredData })
      } else {
        res.status(404).json({ error: 'Artist not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getAllArtists()
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
