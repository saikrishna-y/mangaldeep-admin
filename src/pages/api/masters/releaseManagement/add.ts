import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma"

interface release {
  version_number: string
  build_number: string
  version_date: string
  device_type_id: string
  is_backward_compatible: boolean
  popup_count: string
}

const addPrasadCategory = async (data: release) => {
  const { version_number, build_number, version_date, device_type_id, is_backward_compatible, popup_count } = data
  try {
    await prisma.releaseManagement.create({
      data: {
        version_number: parseInt(version_number),
        build_number: parseInt(build_number),
        version_date,
        device_type_id: parseInt(device_type_id),
        is_backward_compatible,
        popup_count: parseInt(popup_count)
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req?.body) {
    res.status(500).send('Fields could not be empty')
  } else {
    try {
      await addPrasadCategory(req.body)
      res.status(201).json({ message: 'Release added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
