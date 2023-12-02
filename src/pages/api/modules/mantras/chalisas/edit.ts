import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface chalisas {
    name: string;
    locales: string;
    id: number;
}

const editChalisas = async (data: chalisas) => {
    const {
        name,
        locales,
        id
    } = data
    try {
        await prisma.chalisas.update({
            where: { id },
            data: {
                name,
                locales,
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
            await editChalisas(req.body);
            res.status(201).json({ message: 'Chalisas updated successfully' })
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
