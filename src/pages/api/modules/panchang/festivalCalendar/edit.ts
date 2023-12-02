import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface calendar {
    festival_id: number;
    festival_date: string;
    locales: [];
    id: number;
}

const editFestivalCalendar = async (data: calendar) => {
    const {
        festival_id,
        festival_date,
        locales,
        id,
    } = data
    try {
        await prisma.festivalCalendar.update({
            where: { id },
            data: {
                festival_id,
                festival_date,
                locales
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
            await editFestivalCalendar(req.body);
            res.status(201).json({ message: 'Festival calendar added successfully' })
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
