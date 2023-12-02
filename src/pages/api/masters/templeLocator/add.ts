import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma"

interface locator {
  keyword: string
  locales: []
  deity_id: number
}

const addTempleLocator = async (data: locator) => {
  const { keyword, deity_id, locales } = data
  try {
    await prisma.templeLocator.create({
      data: {
        keyword,
        locales,
        deity_id
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keyword, deity_id, locales } = req.body
  if (keyword?.length <= 0) {
    res.status(500).send('Keyword can not be empty')
  } else if (!deity_id) {
    res.status(500).send('Deities can not be empty')
  } else if (!locales) {
    res.status(500).send('Locales can not be empty')
  } else {
    try {
      await addTempleLocator(req.body)
      res.status(201).json({ message: 'Temple locator keyword added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
