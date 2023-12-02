import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface sankalp {
    text: string;
    locales: [];
    id: number;
}

const editSankalp = async (data: sankalp) => {
    const { text, locales, id } = data
    try {
        await prisma.sankalp.update({
            where: { id },
            data: {
                text,
                locales,
            }
        })

        return true
    } catch (err) {
        return false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        text,
        locales,
    } = req?.body;
    if (text.length < 1) {
        res.status(500).send('Text can not be empty')
    } else if (locales.length < 1) {
        res.status(500).send('Locale can not be empty')
    } else {
        try {
            await editSankalp(req.body);
            res.status(201).json({ message: 'Sakalps updated successfully' })
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
