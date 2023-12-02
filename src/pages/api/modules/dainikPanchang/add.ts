import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

interface store {
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
}

const addPanchang = async (data: store) => {
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
    summary
  } = data
  try {
    await prisma.dainikpanchang.create({
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
      await addPanchang(req.body)
      res.status(201).json({ message: 'Dainik panchang added successfully' })
    } catch (e) {
      res.status(500).send(e)
    }
  }
}
