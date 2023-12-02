import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface panchank {
  panchang_date: string
  is_festival: boolean
  is_purnima: boolean
  is_amavasya: boolean
  day: string
  karna: string
  yoga: string
  nakshatra: string
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  ayana: string
  masa: string
  rutu: string
  samvatsara: string
  saura_masa: string
  gulikakala: string
  rahukal: string
  yamagandakala: string
  locales: []
  summary: string
  id: number
}

const editPanchang = async (data: panchank) => {
  const {
    panchang_date,
    is_festival,
    is_purnima,
    is_amavasya,
    day,
    karna,
    yoga,
    nakshatra,
    sunrise,
    sunset,
    moonrise,
    moonset,
    ayana,
    masa,
    rutu,
    samvatsara,
    saura_masa,
    gulikakala,
    rahukal,
    yamagandakala,
    locales,
    summary,
    id
  } = data
  try {
    await prisma.dainikpanchang.update({
      where: { id },
      data: {
        panchang_date,
        is_festival,
        is_purnima,
        is_amavasya,
        day,
        karna,
        yoga,
        nakshatra,
        sunrise,
        sunset,
        moonrise,
        moonset,
        ayana,
        masa,
        rutu,
        samvatsara,
        saura_masa,
        gulikakala,
        rahukal,
        yamagandakala,
        locales,
        summary
      }
    })

    return true
  } catch (err) {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req?.body) {
    res.status(500).send('Fields can not be empty')
  } else {
    try {
      await editPanchang(req.body)
      res.status(201).json({ message: 'Dainik panchang added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
