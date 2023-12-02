import { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from "src/utlis/prisma"


interface Country {
  id: number
}

const deleteCountry = async (data: Country) => {
  const { id } = data
  try {
    await prisma.country.delete({
      where: {
        id
      }
    })

    return true
  } catch (err) {
    
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await deleteCountry(req.body)
    res.status(201).json({ message: 'Country deleted successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
