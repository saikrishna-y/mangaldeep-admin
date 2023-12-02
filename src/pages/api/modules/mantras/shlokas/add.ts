import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface shlokas {
  name: string
  description: string
  deity_id: number
  image_id: number;
  image_url: string;
  image_module_id: number;
  shloka_content: string
  pronunciation: string
  locales: string;
}

const addShloka = async (data: shlokas, res: any) => {
  const { image_module_id, ...rest } = data

  if (
    !data.deity_id ||
    !data.name ||
    !data.description ||
    !data.shloka_content ||
    !data.pronunciation ||
    !data.locales ||
    data.locales.length == 0
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (data.image_id) {
    const image = await prisma.images.findFirst({ where: { id: data.image_id } })
    await prisma
      .shlokas
      .create({ data: { ...rest, image_url: image?.image_url } })
      .then(() => { return res.status(201).json({ message: 'Shloka added successfully' }) })
      .catch((err) => {

        return res.status(400).json(err)
      })

    return
  }

  if (data?.image_url && data?.image_module_id) {
    const existingImage = await prisma.images.findFirst({ where: { image_url: data.image_url } })
    if (!existingImage) await prisma.images.create({ data: { image_url: data?.image_url, locales: data?.locales, image_module_id } })
  }

  await prisma
    .shlokas
    .create({ data: rest })
    .then(() => res.status(201).json({ message: 'Shloka added successfully' }))
    .catch((err) => {

      return res.status(400).json(err)
    })
}

export default async function handler(req: any, res: any) {
  if (!req?.body) {
    res.status(500).send('Fields can not be empty')
  } else {
    try {
      await addShloka(req.body, res)
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
