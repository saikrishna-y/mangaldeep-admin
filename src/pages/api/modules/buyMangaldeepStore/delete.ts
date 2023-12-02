import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface store {
    id: number
}

const deleteStore = async (data: store) => {
    const { id } = data
    try {
        await prisma.mangaldeepStore.delete({
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
        await deleteStore(req.body);
        res.status(201).json({ message: 'Mangaldeep store deleted successfully' })
    } catch (e) {
        res.status(500).send(e)
    }
}
