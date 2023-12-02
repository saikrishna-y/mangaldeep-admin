import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface shlokas {
    name: string;
    description_to_share: string;
    deity_id: number;
    locales: string;
    images_id: number;
    ashtothra_details: [];
}

const addAshtothra = async (data: shlokas) => {
    const {
        name,
        description_to_share,
        deity_id,
        locales,
        ashtothra_details,
    } = data
    try {
        const reponse = await prisma.ashtothras.create({
            data: {
                name,
                description_to_share,
                deity_id,
                locales
            }
        })
        const details = [];
        if (ashtothra_details.length > 1) {
            for (const data of ashtothra_details) {
                const data1: any = data
                const params = {
                    id: reponse?.id,
                    ...data1
                }
                details.push(params)
            }
            await prisma.ashtothraDetails.createMany({
                data: details,
            })
        }

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
            await addAshtothra(req.body);
            res.status(201).json({ message: 'Ashtothra added successfully' })
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
