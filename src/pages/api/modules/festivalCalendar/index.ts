import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "src/utlis/prisma";


const getFestivalCalendar = async () => {
    const results = await prisma.festivalCalendar.findMany({
        include: {
            Festivals: true
        }
    })

    if (results.length > 0) {
        const finalData: any = [];
        for (const d of results) {
            const locales = await prisma.locales.findMany({
                where: {
                    id: {
                        in: JSON.parse(JSON.stringify(d?.locales))
                    }
                }
            })

            // results.map(data => {
            //     const locale = locales.map(d => {
            //         return d
            //     })

            //     return {
            //         ...data,
            //         locales: locale
            //     }
            // })
            const params: any = { ...d }
            params.locales = locales
            finalData.push(params)
        }

        return finalData
    } else {
        return results || false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await getFestivalCalendar();
        if (response) {
            res.status(201).json({ data: response })
        } else {
            res.status(400)
        }
    } catch (e: any) {
        res.status(500).send(e.toString())
    }
}