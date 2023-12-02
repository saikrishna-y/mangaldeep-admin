import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface LocationProps {
  name: string
  location_code: string
  country_id: number
  zone_id: number
  panchang_id: number
}

const addLocation = async (data: LocationProps) => {
  const { name, location_code, country_id, zone_id, panchang_id } = data

  try {
    const zone = await prisma.zone.findFirst({ where: { id: data?.zone_id } })
    await prisma.locations.create({
      data: {
        name,
        location_code,
        country_id,
        panchang_id,
        zone_id,
        zone_name: zone?.name
      }
    })

    return true
  } catch (err) {
    console.log('err in locations', err)

    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await addLocation(req.body)
    res.status(201).json({ message: 'Location added successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
