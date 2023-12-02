import { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from 'src/utlis/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id?.toString()
  if (id) {
    try {
      const singleFestivalData = await prisma.festivals.findUnique({ where: { id: parseInt(id) } })
      res.status(200).send(singleFestivalData)
    } catch (err) {
      res.status(500).send('Error fetching data from festivals')
    }
  } else {
    try {
      const response = await prisma.festivals.findMany()
      if (response) {
        res.status(200).send({ data: response })
      } else res.status(400)
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

export default handler
