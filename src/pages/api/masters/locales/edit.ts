import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface Locale {
  name: string
  zone_id: number
  id: number
  country_id: number
  location_id: number
  language_id: number
}

const editLocale = async (data: Locale, res: NextApiResponse) => {
  // const { name, id, country_id, location_id, language_id } = data
  // try {
  //   await prisma.locales.update({
  //     where: { id },
  //     data: {
  //       name,
  //       country_id,
  //       location_id,
  //       language_id
  //     }
  //   })

  //   return true
  // } catch (err) {
  //   return false
  // }
  if (
    !data?.id ||
    !data?.country_id ||
    !data?.location_id ||
    !data?.language_id
  ) return res.status(400).json({ message: 'All fields are required' })

  const location = await prisma.locations.findFirst({ where: { id: data.location_id } })
  const language = await prisma.languages.findFirst({ where: { id: data.language_id } })
  const country = await prisma.country.findFirst({ where: { id: data.country_id } })

  await prisma.locales.update({
    where: { id: data.id }, 
    data: {
      name: data?.name,
      location_name: location?.name || "",
      location_code: location?.location_code || "",
      language_name: language?.name,
      language_code: language?.language_code,
      country_name: country?.name,
      country_code: country?.country_code,
      locale_display_name: `${country?.name}-${location?.name}-${language?.name} (${data?.name})`,
      location_id: data?.location_id,
      language_id: data?.language_id,
      country_id: data?.country_id
    } 
  })
  .then(() => res.status(200).json({ message: 'Locale edited successfully' }))
  .catch((err) => {
    return res.status(400).json(err)
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await editLocale(req.body, res)
  } catch (e) {
    res.status(500).send(e)
  }
}
