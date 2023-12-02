import { NextApiRequest, NextApiResponse } from 'next/types'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const addChalisas = async (req: NextApiRequest, res: NextApiResponse) => {
  const { image_module_id, ...rest } = req.body

  if (
    !req.body.deity_id ||
    !req.body.name ||
    !req.body.locales ||
    req.body.locales.length == 0 ||
    !req.body.content
  ) {
    return res.status(400).json({ message: 'All Fields are required' })
  }

  if (req.body.image_id) {
    const image = await prisma.images.findFirst({ where: { id: req.body.image_id } })
    await prisma
      .chalisas
      .create({ data: { ...rest, image_url: image?.image_url } })
      .then(() => { return res.status(201).json({ message: 'Chalisa added successfully' }) })
      .catch((err) => {

        return res.status(400).json(err)
      })

    return
  }

  if (req.body?.image_url && req.body?.image_module_id) {
    const existingImage = await prisma.images.findFirst({ where: { image_url: req.body.image_url } })
    if (!existingImage) await prisma.images.create({ data: { image_url: req.body?.image_url, locales: req.body?.locales, image_module_id } })
  }

  await prisma
    .chalisas
    .create({ data: rest })
    .then(() => res.status(201).json({ message: 'Chalisa added successfully' }))
    .catch((err) => {

      return res.status(400).json(err)
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req?.body) {
    res.status(500).send('Fields can not be empty')
  } else {
    try {
      await addChalisas(req, res)
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
