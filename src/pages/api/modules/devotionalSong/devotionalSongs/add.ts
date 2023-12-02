import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface song {
  name: string;
  deities: string;
  locales: string;
  artists: string;
  image_id: number;
  image_module_id: number;
  image_url: string;
  upload_song: string;
  is_trending_now?: boolean
}

const addDevotionalSongs = async (data: song, res: NextApiResponse) => {
  const { image_module_id, ...rest } = data

  if (
    !data.name ||
    !data.deities ||
    data.deities.length == 0 ||
    !data.locales ||
    data.locales.length == 0 ||
    !data.artists ||
    data.artists.length == 0 ||
    !data.upload_song
  ) return res.status(400).json({ message: 'All fields are required' })

  if (data.image_id) {
    const image = await prisma.images.findFirst({ where: { id: data.image_id } })

    // await prisma
    //   .devotionalSongs
    //   .create({ data: { ...rest, image_url: image?.image_url } })
    //   .then(() => { return res.status(201).json({ message: 'Devotional song added successfully' }) })
    //   .catch((err) => {

    //     return res.status(400).json(err)
    //   })
    const newDevSong = await prisma.devotionalSongs.create({ data: { ...rest, image_url: image?.image_url } })
    if (data.is_trending_now) await prisma.trendingNow.create({ data: { type_id: 3, category_name: 'devotionalSongs', category_id: newDevSong?.id } })

    return res.status(201).json({ message: 'Devotional song added successfully' })
  }

  if (data?.image_url && data?.image_module_id) {
    const existingImage = await prisma.images.findFirst({ where: { image_url: data.image_url } })
    if (!existingImage) await prisma.images.create({ data: { image_url: data?.image_url, locales: data?.locales, image_module_id } })
  }

  const newDevSong = await prisma.devotionalSongs.create({ data: rest })

  if (data.is_trending_now) await prisma.trendingNow.create({ data: { type_id: 3, category_name: 'devotionalSongs', category_id: newDevSong?.id } })

  return res.status(201).json({ message: 'Devotional song added successfully' })

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req?.body) {
    res.status(500).send('Fields can not be empty')
  } else {
    try {
      await addDevotionalSongs(req.body, res)
    } catch (e: any) {
      res.status(500).send(e.toString())
    }
  }
}
