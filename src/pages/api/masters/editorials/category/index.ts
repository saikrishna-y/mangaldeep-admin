import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'src/utlis/prisma'

const getCategory = async () => {
  // const results = await prisma.editorialCategories.findMany({
  //   include: {
  //     Images: true,
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
  const results = await prisma.editorialCategories.findMany({})

  return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id) {
    try {
      const singleEditorialCategory = await prisma.editorialCategories.findUnique({ where: { id: Number(id) } })
      if (singleEditorialCategory) {
        const { locales, ...rest } = singleEditorialCategory
        const localeData = []
        for (const locale of singleEditorialCategory?.locales?.split(",")?.filter((e) => e !== " ")) {
          const localeRecord = await prisma.locales.findFirst({ where: { name: locale } })
          localeData.push(localeRecord)
        }
        const alteredData = { ...rest, locales: localeData }
        res.status(200).json({ data: alteredData })
      } else {
        res.status(404).json({ error: 'Editorial Category not found' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getCategory()
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
