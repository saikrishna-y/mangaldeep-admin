import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

const getAllImages = async (req: ExtendedNextApiRequest<{ module_id: number; locales: number[] }>, res: NextApiResponse) => {
  // await prisma
  //   .carouselGrouping
  //   .findUnique({ where: { id: parseInt(req.query.id) } })
  //   .then((singleTempleRaaga) => {
  //     res.status(200).json({ data: singleTempleRaaga })
  //   })
  //   .catch((err) => {
  //     return res.status(400).json(err)
  //   })
  const { module_id, locales } = req.body
  if (!module_id) {
    return res.status(400).json({ message: 'Module id is required' })
  }

  // if (module_id && !locales) {
  //   await prisma
  //     .images
  //     .findMany({ where: { image_module_id: module_id } })
  //     .then((images) => res.status(200).json(images.map((image) => { return { id: image.id, image_url: image.image_url } })))

  //   return
  // }
  if (locales.length > 0) {
    
    // const images = await prisma
    //   .images
    //   .findMany({ where: { image_module_id: module_id } })

    // .then((images) => {
    //   const filteredImages = []
    //   for (const image of images) {
    //     if (locales.every(elem => image.locales.includes(elem))) filteredImages.push(image)
    //   }

    //   res.status(200).json(filteredImages.map((image) => { return { id: image.id, image_url: image.image_url } }))
    // })
    // const filteredImages = []
    // for (const image of images) {
    //   if (locales.every(elem => image.locales.includes(elem))) filteredImages.push(image)
    // }

    // return res.status(200).json(filteredImages.map((image) => { return { id: image.id, image_url: image.image_url } }))
  } else if (locales.length == 0) {
    await prisma
      .images
      .findMany({ where: { image_module_id: module_id } })
      .then((images) => {
        res.status(200).json(images.map((image) => { return { id: image.id, image_url: image.image_url } }))
      })

    return
  }

}

export default async function handler(req: ExtendedNextApiRequest<{ module_id: number; locales: [] }>, res: NextApiResponse) {
  try {
    // if (req.query.id) {
    //   // await getSingleCarouselGrouping(req, res)
    // } else {
    //   // await getCarouselGroupings(req, res)
    // }
    await getAllImages(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}