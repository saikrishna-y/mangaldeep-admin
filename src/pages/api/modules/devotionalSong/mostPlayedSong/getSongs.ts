import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const getSongsViaLocales = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.locale_id) return res.status(400).json({ message: 'Locale id is required' })
  const data = await prisma.devotionalSongs.findMany({ select: { id: true, name: true, locales: true } })

  // const songsBasedOnLocale = data.filter((song) => song.locales.includes(req.body.locale_id))

  return res.status(200).json({ data, locales: '' })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await getSongsViaLocales(req, res)
  } catch (e) {
    res.status(500).send(e)
  }
}