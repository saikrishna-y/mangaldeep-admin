import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface pandal {
  name: string
  latitude: string
  longitude: string
  description: string
  address: string
  pandal_url: string
  locales: string;
  deity_id: number
  image_id: number;
  image_url: string;
  image_module_id: number;
}

const addPandals = async (data: pandal, res: NextApiResponse) => {
  const { image_module_id, ...rest } = data

  if (
    !data.deity_id ||
    !data.name ||
    !data.locales ||
    data.locales.length == 0 ||
    !data.latitude ||
    !data.longitude
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (data.image_id) {
    const image = await prisma.images.findFirst({ where: { id: data.image_id } })
    await prisma
      .pandals
      .create({ data: { ...rest, image_url: image?.image_url } })
      .then(() => { return res.status(201).json({ message: 'Pandal added successfully' }) })
      .catch((err) => {

        return res.status(400).json(err)
      })

    return
  }

  if (data?.image_url && data?.image_module_id) {
    const existingImage = await prisma.images.findFirst({ where: { image_url: data.image_url } })
    if (!existingImage) await prisma.images.create({ data: { image_url: data?.image_url, locales: data?.locales, image_module_id } })
  }

  await prisma
    .pandals
    .create({ data: rest })
    .then(() => res.status(201).json({ message: 'Pandal added successfully' }))
    .catch((err) => {

      return res.status(400).json(err)
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await addPandals(req.body, res)
  } catch (e) {
    res.status(500).send(e)
  }
}
