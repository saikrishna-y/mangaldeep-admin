import { NextApiRequest, NextApiResponse } from 'next/types'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface File {
  url: string
  language_id: number
  location_id: number
  locale_id: number
  file_url: string
}

const uploadExcelFile = async (data: File) => {
  console.log('checking in add api', data)

  // to do file upload
  try {
    await prisma.panchangExcelFile.create({
      data: {
        ...data,
        file_url: 'https://mangaldeepsarveshaampujaportal.azurewebsites.net/Images/logo_icon.png'
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await uploadExcelFile(req.body)
    res.status(201).json({ message: 'File uploaded successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
