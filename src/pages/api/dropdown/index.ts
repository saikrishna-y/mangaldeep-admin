/* eslint-disable @typescript-eslint/no-unused-vars */

import prisma from 'src/utlis/prisma'

const getImageModuleDropdown = async (data: { image_module_id: any; locales_id: any }) => {
  const { image_module_id, locales_id } = data
  try {
    const results = await prisma.images.findMany({
      where: {
        OR: [
          {
            image_module_id: {
              equals: image_module_id
            }
          },

          // {
          //   locales_id: {
          //     equals: locales_id
          //   }
          // }
        ]
      }
    })

    return results
  } catch (err: any) {
    return err
  }
}

const MostPlayedSong = async (data: { image_module_id: any; locales_id: any }) => {
  const { locales_id } = data
  const finalData = []
  try {
    const songs = await prisma.devotionalSongs.findMany({})
    
    // for (const data of songs) {
    //   for (const id of data.locales) {
    //     if (locales_id == id) {
    //       finalData.push(data)
    //     } else {
    //       return []
    //     }
    //   }
    // }
  } catch (err: any) {
    return err
  }
}

export default async function handler(req: any, res: any) {
  try {
    if (req.body.type == 'image_modules') {
      const response = await getImageModuleDropdown(req.body)
      res.status(201).json({ data: response })
    } else if (req.body.type == 'mostplayed_song') {
      const response = await MostPlayedSong(req.body)
      res.status(201).json({ data: response })
    }
  } catch (e: any) {
    res.status(500).send(e.toString())
  }
}
