import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "src/utlis/prisma";


const getKavachas = async () => {
    const results = await prisma.kavachas.findMany({
        where: {
            is_active: true
        },
        include: {
            Deities: true,
            Images: true
        }

    })

    if (results.length > 0) {
        const finalData = [];
        for (const d of results) {
            const locales = await prisma.locales.findMany({
                where: {
                    id: {
                        in: JSON.parse(JSON.stringify(d.locales))
                    }
                }
            })
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
        const response = await getKavachas();
        if (response) {
            res.status(201).json({ data: response })
        } else {
            res.status(400)
        }
    } catch (e: any) {
        res.status(500).send(e.toString())
    }
}