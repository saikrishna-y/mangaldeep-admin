import { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from 'src/utlis/prisma'

interface Country {
  name: string
  country_code: string
  isDefault?: boolean
  isActive?: boolean
}

const addCountry = async (data: Country) => {

  try {
    await prisma.country.create({
      data
    })

    return true
  } catch (err) {
    console.log('err in country', err)

    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await addCountry(req.body)
    res.status(201).json({ message: 'Country added successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
