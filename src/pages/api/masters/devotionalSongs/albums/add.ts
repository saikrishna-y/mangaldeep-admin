import { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from 'src/utlis/prisma'

interface album {
  name: string
  image_id: number
  locales: string;
  image_module_id: number;
  image_url: string;
}

const addAlbum = async (data: album, res: NextApiResponse) => {
  const { image_module_id, ...rest } = data

  if (data.image_id) {
    const image = await prisma.images.findFirst({ where: { id: data.image_id } })
    await prisma
      .albums
      .create({ data: { ...rest, image_url: image?.image_url } })
      .then(() => { return res.status(201).json({ message: 'Album added successfully' }) })
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
    .albums
    .create({ data: rest })
    .then(() => res.status(201).json({ message: 'Album added successfully' }))
    .catch((err) => {

      return res.status(400).json(err)
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, locales } = req.body
  if (
    !name ||
    !locales ||
    locales.length == 0
  ) return res.status(400).json({ message: 'All fields are required' })
  try {
    await addAlbum(req.body, res)
  } catch (e) {
    res.status(500).send(e)
  }
}
