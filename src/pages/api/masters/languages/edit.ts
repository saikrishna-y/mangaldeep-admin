import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface language {
  name: string
  language_code: string
  id: number
}

const editLanguage = async (data: language) => {
  const { name, language_code, id } = data
  try {
    await prisma.languages.update({
      where: { id },
      data: {
        name,
        language_code
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editLanguage(req.body)
    res.status(201).json({ message: 'language edited successfully' })
  } catch (e) {
    res.status(500).send(e)
  }
}
