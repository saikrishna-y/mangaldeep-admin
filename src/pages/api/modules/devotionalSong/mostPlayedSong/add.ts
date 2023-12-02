import { NextApiRequest, NextApiResponse } from 'next/types'

interface song {
  songs: [];
  locales: number;
}

const addMostPlayedSongs = async (data: song, res: NextApiResponse) => {
  // const { songs } = data
  // try {
  //   await prisma.devotionalSongs.updateMany({
  //     where: {
  //       id: {
  //         in: songs
  //       }
  //     },
  //     data: {
  //       is_famous_song: true
  //     }
  //   })

  //   return true
  // } catch (err) {
  //   console.log(err, 'ererer')

  //   return false
  // }
  // if (
  //   !data.songs ||
  //   data.songs.length == 0 ||
  //   !data.locale_id
  // ) return res.status(400).json({ message: 'All fields are required' })

  // await prisma
  //   .mostPlayedSongs
  //   .create({ data })
  //   .then(() => res.status(201).json({ message: 'Most Played song added successfully' }))
  //   .catch((err) => { return res.status(400).json(err) })

  if (
    !data.locales ||
    !data.songs ||
    data.songs.length == 0
  ) return res.status(400).json({ message: 'Songs and Locales are required' })

  // for (const song of data.songs) {
  //   const dsong = await prisma.devotionalSongs.findUnique({ where: { id: song } })
  //   if (dsong && !dsong.locales.includes(data.locales)) {
  //     await prisma.devotionalSongs.update({ where: { id: song }, data: { locales: [...dsong.locales, data.locales] } })
  //   }
  // }

  return res.status(201).json({ message: 'Most Played song added successfully' })

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    await addMostPlayedSongs(req.body, res)
  } catch (e) {
    res.status(500).send(e)
  }
}
