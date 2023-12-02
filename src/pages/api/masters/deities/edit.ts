import { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from "src/utlis/prisma"

interface Deities {
  name: string
  locales: string
  isCustomizedGod: boolean
  img_url: string
  image_id: number
  id: number;
  image_module_id: number;
}

const editDeity = async (res: NextApiResponse, data: Deities) => {
  const { id, image_module_id, ...rest } = data
  console.log(image_module_id)

  // try {
  //   await prisma.deitie.update({
  //     where: { id },
  //     data
  //   })

  //   return true
  // } catch (err) {
  //   return false
  // }
  await prisma.deitie.update({
    where: { id },
    data: rest
  })
  .then(() => res.status(201).json({ message: 'Deities edited successfully' }))
  .catch((err) => {
    res.status(400).json(err)
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editDeity(res, req.body)
    res.status(201).json({ message: 'Deities edited successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
