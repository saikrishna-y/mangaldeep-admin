import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface shlokas {
    name: string;
    description_to_share: string;
    deity_id: number;
    locales: string;
    images_id: number;
    id: number;
    ashtothra_details: [];
}

const editAshtothra = async (data: shlokas) => {
    const {
        name,
        description_to_share,
        deity_id,
        locales,
        id,
        ashtothra_details,
    } = data
    try {
        await prisma.ashtothras.update({
            where: { id },
            data: {
                name,
                description_to_share,
                deity_id,
                locales
            }
        })
        await prisma.ashtothraDetails.updateMany({
            where: { id },
            data: ashtothra_details,
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
            await editAshtothra(req.body);
            res.status(201).json({ message: 'Ashtothra updated successfully' })
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
