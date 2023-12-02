import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface festival {
  name: string
  locales: string
  image_url: string
  image_id: number
  id: number;
  image_module_id: number;
}

const editFestival = async (data: festival) => {
  const { id, image_module_id, ...rest } = data
  console.log(image_module_id)
  try {
    await prisma.festivals.update({
      where: { id },
      data: rest
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editFestival(req.body)
    res.status(201).json({ message: 'Festival edited successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
