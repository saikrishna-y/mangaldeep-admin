import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface calendaar {
    id: number
}

const deleteFestivalCalendar = async (data: calendaar) => {
    const { id } = data
    try {
        await prisma.festivalCalendar.delete({
            where: {
                id
            },
        })

        return true
    } catch (err) {
        return false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await deleteFestivalCalendar(req.body);
        res.status(201).json({ message: 'Festival calendar deleted successfully' })
    } catch (e) {
        res.status(500).send(e)
    }
}
