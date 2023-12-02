import { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from 'src/utlis/prisma'

const getDeities = async () => {
  try {
    // const results = await prisma.deities.findMany({
    //   include: {
    //     Images: true
    //   }
    // })
    // if (results.length > 0) {
    //   const finalData = []
    //   for (const d of results) {
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
    //     const params = { ...d, locales }

    //     // params.locales = locales
    //     finalData.push(params)
    //   }

    //   return finalData
    // } else {
    //   return results
    // }
    const results = await prisma.deitie.findMany({})

    return results
  } catch (err) {
    return err
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (id) {
    try {
      const singleDeity = await prisma.deitie.findUnique({ where: { id: Number(id) } })
      if (singleDeity) {
        const { locales, ...rest } = singleDeity
        console.log(locales)
        const localeData = []
        for (const locale of singleDeity?.locales?.split(", ")?.filter((e) => e !== "")) {
          const localeRecord = await prisma.locales.findFirst({ where: { name: locale } })
          localeData.push(localeRecord)
        }
        const alteredData = { ...rest, locales: localeData }
        res.status(200).json({ data: alteredData })
      } else {
        res.status(404).json({ error: 'Deity not found' })
      }
    } catch (err: unknown) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getDeities()
      if (response) {
        res.status(200).send(response)
      } else {
        res.status(400)
      }
    } catch (err) {
      res.status(500).send('Error fetching data from deities')
    }
  }
}

export default handler
