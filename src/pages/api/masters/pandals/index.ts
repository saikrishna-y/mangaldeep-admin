import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from '../../../../utlis/prisma'

const getPandals = async () => {
  try {
    const results = await prisma.pandals.findMany({
      include: {
        Deities: true,
        Images: true
      }
    })
    if (results.length > 0) {
      const finalData = [];
      for (const d of results) {
        console.log(d.locales, 'saasdasdasadsads');
        const locales = await prisma.locales.findMany({
          where: {
            id: {
              in: JSON.parse(JSON.stringify(d.locales))
            }
          },
        })
        const params: any = { ...d }
        params.locales = locales
        finalData.push(params)
      }

      return finalData
    }

    return results
  } catch (err) {
    return err
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (id) {
    try {
      const singlePandal = await prisma.pandals.findUnique({ where: { id: Number(id) } })
      if (singlePandal) {
        res.status(201).json({ data: singlePandal })
      } else {
        res.status(404).json({ error: 'Pandal not found' })
      }
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    try {
      const response = await getPandals()

      if (response) {
        res.status(200).send(response)
      } else {
        res.status(400)
      }
    } catch (err) {
      res.status(500).send('Error fetching data from pandals')
    }
  }
}

export default handler
