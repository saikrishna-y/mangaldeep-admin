import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface language {
  name: string
  location_code: string
  id: number
  country_id: number
  zone_id: number
  panchang_id: number
}

const editLocation = async (data: language) => {
  const { name, location_code, id, country_id, zone_id, panchang_id } = data
  try {
    await prisma.locations.update({
      where: { id },
      data: {
        name,
        location_code,
        country_id,
        zone_id,
        panchang_id
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editLocation(req.body)
    res.status(201).json({ message: 'Location edited successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
