import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface release {
    id: number
}

const deleteRelease = async (data: release) => {
    const { id } = data
    try {
         await prisma.releaseManagement.delete({
            where: {
                id
            }
        })

        return true
    } catch (err) {
        return false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
         await deleteRelease(req.body);
        res.status(201).json({   message: 'Release deleted successfully' })
    } catch (e) {
        res.status(500).send(e)
    }
}
