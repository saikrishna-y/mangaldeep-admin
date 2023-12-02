import { NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */

import prisma from 'src/utlis/prisma'

const getAllUser = async () => {
  const results = await prisma.users.findMany({
    include: {
      Languages: true,
      Locations: true,
      Providers: true,
      Roles: true,
    }
  })

  return results.map((user) => {
    return { ...user, full_name: user.first_name + ' ' + user.second_name }
  })
}

export default async function handler(res: NextApiResponse) {
  try {
    const response = await getAllUser();
    if (response) {
      res.status(201).json({ data: response })
    } else {
      res.status(400)
    }
  } catch (e: any) {
    res.status(500).send(e.toString())
  }
}
