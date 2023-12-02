import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next/types'

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface bannerAttributes {
  name: string
  locales: string
  image_urls: [];
  image_module_id: number;
  image_ids: [];
}

const addBanner = async (req: ExtendedNextApiRequest<bannerAttributes>, res: NextApiResponse) => {
  const { image_module_id, ...rest } = req.body
  if (!req.body.name || !req.body.locales || req.body.locales.length == 0) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  if (req.body.image_ids && req.body.image_ids.length > 0) {
    const { image_ids, ...restv1 } = req.body
    console.log(image_ids)
    const imageUrls: string[] = []
    for (const imageId of req.body.image_ids) {
      const image = await prisma.images.findFirst({ where: { id: imageId } })
      imageUrls.push(image?.image_url ? image?.image_url : '')
    }
    await prisma
      .banner
      .create({ data: { ...restv1, image_url: '' } })
      .then(() => { return res.status(201).json({ message: 'Banner added successfully' }) })
      .catch((err) => {
        console.log('addBanner => catch 1 =>', err)

        return res.status(400).json(err)
      })

    return
  }

  const imageUrls: string[] = []
  if (req.body?.image_urls && req.body?.image_urls.length > 0 && req.body?.image_module_id) {
    for (const imageUrl of req.body.image_urls) {
      const existingImage = await prisma.images.findFirst({ where: { image_url: imageUrl } })
      if (!existingImage) {
        imageUrls.push(imageUrl)
        await prisma.images.create({ data: { image_url: imageUrl, locales: req.body?.locales, image_module_id } })
      }
    }
  }

  await prisma.banner
    .create({ data: { ...rest, image_url: '' } })
    .then(() => res.status(201).json({ message: 'Banner added successfully' }))
    .catch((err: any) => {
      return res.status(400).json(err)
    })
}

export default async function handler(req: ExtendedNextApiRequest<bannerAttributes>, res: NextApiResponse) {
  try {
    await addBanner(req, res)
  } catch (e) {
    return res.status(400).json(e)
  }
}
