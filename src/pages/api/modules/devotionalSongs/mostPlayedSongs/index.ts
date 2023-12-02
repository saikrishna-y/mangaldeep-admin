import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import { constants } from 'buffer'

const prisma = new PrismaClient()

const getMostPlayedSong = async () => {
  const results = await prisma.mostPlayedSongs.findMany({})

  if (results.length > 0) {
    const songs = await prisma.devotionalSongs.findMany({
      where: {
        id: {
          in: JSON.parse(JSON.stringify(results[0]?.songs))
        }
      }
    })
    const finalData = results.map(data => {
      const Songs = songs.map(d => {
        return d
      })

      return {
        id: data?.id,
        locale_id: data?.locale_id,
        songs: Songs
      }
    })

    return finalData
  } else {
    return results
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await getMostPlayedSong()
    if (response) {
      res.status(201).json({ data: response })
    } else {
      res.status(400)
    }
  } catch (e: any) {
    res.status(500).send(e.toString())
  }
}
