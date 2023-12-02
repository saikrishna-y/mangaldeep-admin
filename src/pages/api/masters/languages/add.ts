import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface language {
  name: string
  language_code: string
}

const addLanguage = async (data: language) => {
  const { name, language_code } = data
  try {
    await prisma.languages.create({
      data: {
        name,
        language_code
      }
    })

    return true
  } catch (err) {
    console.log('err in languages', err)

    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await addLanguage(req.body)
    res.status(201).json({ message: 'language added successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
