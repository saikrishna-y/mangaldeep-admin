import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface store {
    id: number
}

const deleteSankalp = async (data: store) => {
    const { id } = data
    try {
        await prisma.sankalp.delete({
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
        await deleteSankalp(req.body);
        res.status(201).json({ message: 'Sankalp deleted successfully' })
    } catch (e) {
        res.status(500).send(e)
    }
}
