import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import { constants } from 'buffer'

const prisma = new PrismaClient()

const getSongs = async () => {
  const results = await prisma.devotionalSongs.findMany({})

  if (results.length > 0) {
    const locales = await prisma.locales.findMany({
      where: {
        id: {
          in: JSON.parse(JSON.stringify(results[0]?.locales))
        }
      }
    })
    const deities = await prisma.deities.findMany({
      where: {
        id: {
          in: JSON.parse(JSON.stringify(results[0]?.deities))
        }
      },
      include: {
        // Locales: true
      }
    })
    const artists = await prisma.artists.findMany({
      where: {
        id: {
          in: JSON.parse(JSON.stringify(results[0]?.artists))
        }
      },
      include: {
        Images: true
      }
    })
    const finalData = results.map(data => {
      const locale = locales.map(d => {
        return d
      })
      const artists_data = artists.map(d => {
        return d
      })
      const deities_data = deities.map(d => {
        return d
      })

      return {
        id: data?.id,
        description: data?.description_to_share,
        audio_url: data?.audio_url,
        isNewSong: data?.is_new_song,
        isFeatured: data?.is_featured,
        isFamousSong: data?.is_famous_song,
        locales: locale,
        deities: deities_data,
        artists: artists_data
      }
    })

    return finalData
  } else {
    return results
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await getSongs()
    if (response) {
      res.status(201).json({ data: response })
    } else {
      res.status(400)
    }
  } catch (e: any) {
    res.status(500).send(e.toString())
  }
}
