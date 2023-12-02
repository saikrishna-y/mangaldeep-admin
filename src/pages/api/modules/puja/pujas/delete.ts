import { NextApiRequest, NextApiResponse } from 'next/types'

// import prisma from "src/utlis/prisma";

// interface store {
//     id: number
// }

// const deletePuja = async (data: store) => {
//     const { id } = data
//     try {
//         await prisma.puja.delete({
//             where: {
//                 id
//             },
//         })

//         return true
//     } catch (err) {
//         return false
//     }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        // await deletePuja(req.body);
        res.status(201).json({ message: 'Puja deleted successfully' })
    } catch (e) {
        res.status(500).send(e)
    }
}
