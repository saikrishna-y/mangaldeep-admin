import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getStore = async () => {
  const results = await prisma.mangaldeepStore.findMany({})

  if (results.length > 0) {
    const locales = await prisma.locales.findMany({
      where: {
        id: {
          in: JSON.parse(JSON.stringify(results[0]?.locales))
        }
      }
    })
    const finalData = results.map(data => {
      const locale = locales.map(d => {
        return d
      })

      return {
        id: data?.id,
        name: data?.name,
        disclaimer: data?.disclaimer,
        image_url: data?.image_url,
        store_url: data?.store_url,
        order_id: data?.order_id,
        is_active: data?.is_active,
        locales: locale
      }
    })

    return finalData
  } else {
    return results
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await getStore()
    if (response) {
      res.status(201).json({ data: response })
    } else {
      res.status(400)
    }
  } catch (e: any) {
    res.status(500).send(e.toString())
  }
}
