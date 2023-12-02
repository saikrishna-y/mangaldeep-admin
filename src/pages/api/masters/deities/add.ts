import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

const addDeity = async (req: NextApiRequest, res: NextApiResponse) => {
  const { image_module_id, ...rest } = req.body

  if (
    !req.body.name ||
    !req.body.locales ||
    req.body.locales.length == 0
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (req.body.image_id) {
    const image = await prisma.images.findFirst({ where: { id: req.body.image_id } })
    await prisma
      .deitie
      .create({ data: { ...rest, image_url: image?.image_url } })
      .then(() => { return res.status(201).json({ message: 'Deity added successfully' }) })
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
    .deitie
    .create({ data: rest })
    .then(() => res.status(201).json({ message: 'Deity added successfully' }))
    .catch((err) => {

      return res.status(400).json(err)
    })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) {
    return res.status(400).send('Requested body cannot be empty')
  }

  try {
    await addDeity(req, res)
  } catch (err: any) {
    res.status(500).send('Internal Server Error')
  }
}

export default handler
