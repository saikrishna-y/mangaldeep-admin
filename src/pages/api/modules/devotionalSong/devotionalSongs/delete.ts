import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface song {
    id: number
}

const deleteDevotionalSongs = async (data: song) => {
    const { id } = data
    try {
         await prisma.devotionalSongs.delete({
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
         await deleteDevotionalSongs(req.body);
        res.status(201).json({ message: 'Devotional song deleted successfully' })
    } catch (e) {
        res.status(500).send(e)
    }
}
