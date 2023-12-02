import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'src/utlis/prisma'

const getSongs = async () => {
  const results = await prisma.devotionalSongs.findMany({})

  // if (results.length > 0) {
  //     const locales = await prisma.locales.findMany({
  //         where: {
  //             id: {
  //                 in: JSON.parse(JSON.stringify(d?.locales))
  //             }
  //         },
  //         include: {
  //             Country: true,
  //             Language: true,
  //             Location: true
  //         }
  //     })
  // const deities = await prisma.deities.findMany({
  //     where: {
  //         id: {
  //             in: JSON.parse(JSON.stringify(d.deities))
  //         }
  //     },
  //     include: {
  //         Images: true,
  //     }
  // })
  // const artists = await prisma.artists.findMany({
  //     where: {
  //         id: {
  //             in: JSON.parse(JSON.stringify(d?.artists))
  //         }
  //     },
  //     include: {
  //         Images: true,
  //     }
  // })
  //     const finalData = results.map(data => {
  //         const locale = locales.map(d => {
  //             return d
  //         })
  //         const artists_data = artists.map(d => {
  //             return d
  //         })
  //         const deities_data = deities.map(d => {
  //             return d
  //         })

  //         return {
  //             id: data?.id,
  //             title:data?.title,
  //             description:data?.description,
  //             audio_url:data?.audio_url,
  //             album_id:data?.album_id,
  //             isNewSong:data?.isNewSong,
  //             isFeatured:data?.isFeatured,
  //             isFamousSong:data?.isFamousSong,
  //             image_id:data?.image_id,
  //             is_active:data?.is_active,
  //             locales: locale,
  //             deities:deities_data,
  //             artists:artists_data,
  //         }
  //     })

  //     return finalData
  // } else {
  if (results.length > 0) {
    const finalData = []
    for (const d of results) {
      console.log(d.locales, 'saasdasdasadsads')
      const locales = await prisma.locales.findMany({
        where: {
          id: {
            in: JSON.parse(JSON.stringify(d.locales))
          }
        }
      })
      const deities = await prisma.deities.findMany({
        where: {
          id: {
            in: JSON.parse(JSON.stringify(d.deities))
          }
        },
        include: {
          Images: true
        }
      })
      const artists = await prisma.artists.findMany({
        where: {
          id: {
            in: JSON.parse(JSON.stringify(d?.artists))
          }
        },
        include: {
          Images: true
        }
      })
      const params: any = { ...d }
      params.locales = locales
      params.deities = deities
      params.artists = artists
      finalData.push(params)
    }

    return finalData
  } else {
    return results
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (id) {
    try {
      const devotionalSongs = await prisma.devotionalSongs.findUnique({ where: { id: Number(id) } })
      if (devotionalSongs) {
        res.status(201).json({ data: devotionalSongs })
      } else {
        res.status(404).json({ error: 'Devotional Songs not found' })
      }
    } catch (err: any) {
      res.status(500).send(err.toString())
    }
  } else {
    try {
      const response = await getSongs()
      if (response) {
        res.status(201).json(response)
      } else {
        res.status(400)
      }
    } catch (e: any) {
      res.status(500).send(e.toString())
    }
  }
}
