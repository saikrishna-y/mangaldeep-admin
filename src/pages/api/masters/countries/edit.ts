import { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from 'src/utlis/prisma'

interface language {
  name: string
  country_code: string
  id: number
}

const editCountry = async (data: language) => {
  const { name, country_code, id } = data
  try {
    await prisma.country.update({
      where: { id },
      data: {
        name,
        country_code
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editCountry(req.body)
    res.status(201).json({ message: 'country edited successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
