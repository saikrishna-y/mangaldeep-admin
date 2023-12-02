import { NextApiRequest, NextApiResponse } from 'next/types'

// import prisma from "src/utlis/prisma";

// interface puja {
//     name: string;
//     weekday: [];
//     description: string;
//     description_to_share: string;
//     image_id: number;
//     background: string;
//     timings: string;
//     puja_type_id: number;
//     deities: [];
//     festivals: [];
//     locales: [];
//     procedure: string;
//     id: number;
//     pujaMaterial: []; //array of material objs
// }

// const editPuja = async (data: puja) => {
//     const { name,
//         weekday,
//         description,
//         description_to_share,
//         image_id,
//         background,
//         timings,

//         // puja_type_id,
//         deities,
//         festivals,
//         locales,
//         id,
//         procedure,
//         pujaMaterial,
//     } = data
//     try {
//         await prisma.puja.update({
//             where: {
//                 id
//             },
//             data: {
//                 name,
//                 weekday,
//                 description,
//                 description_to_share,
//                 image_id,
//                 background,
//                 timings,

//                 // puja_type_id,
//                 deities,
//                 festivals,
//                 locales,
//                 procedure,
//             }
//         })
//         await prisma.pujaMaterial.updateMany({
//             where: { id },
//             data: pujaMaterial,
//         })

//         return true
//     } catch (err) {
//         return false
//     }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        name,
        weekday,
        description,
        description_to_share,
        image_id,
        background,
        timings,
        puja_type_id,
        deities,
        festivals,
        locales,
        procedure,
    } = req?.body;
    if (weekday.length < 1) {
        res.status(500).send('Weekdays can not be empty')
    } else if (locales.length < 1) {
        res.status(500).send('Locale can not be empty')
    } else if (!name) {
        res.status(500).send('Name can not be empty')
    } else if (!description) {
        res.status(500).send('description can not be empty')
    } else if (!description_to_share) {
        res.status(500).send('description to share URL can not be empty')
    } else if (!image_id) {
        res.status(500).send('Image can not be empty')
    } else if (!background) {
        res.status(500).send('Background can not be empty')
    } else if (!timings) {
        res.status(500).send('Timings can not be empty')
    } else if (!puja_type_id) {
        res.status(500).send('Puja type can not be empty')
    } else if (deities.length < 1) {
        res.status(500).send('Deities can not be empty')
    } else if (!festivals) {
        res.status(500).send('Festivals can not be empty')
    } else if (!locales) {
        res.status(500).send('Locales can not be empty')
    } else if (!procedure) {
        res.status(500).send('Procedure can not be empty')
    } else {
        try {

            // await editPuja(req.body);
            res.status(201).json({ message: 'Puja updated successfully' })
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
