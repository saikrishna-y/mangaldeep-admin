import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface store {
    name: string,
    disclaimer: string,
    image_url: string,
    store_url: string,
    order_id: any,
    locales: [],
}

const addStore = async (data: store) => {
    const { name,
        disclaimer,
        image_url,
        store_url,
        order_id,
        locales, } = data
    try {
        await prisma.mangaldeepStore.create({
            data: {
                name,
                disclaimer,
                image_url:image_url||'url',
                store_url,
                order_id:parseInt(order_id),
                locales,
            }
        })

        return true
    } catch (err) {
        console.log(err,'<<<<<<++++err');
        
        return false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        name,
        disclaimer,
        image_url,
        store_url,
        order_id,
        locales,
    } = req?.body;
    if (order_id=="") {
        res.status(500).send('Order can not be empty')
    } else if (locales.length<1) {
        res.status(500).send('Locale can not be empty')
    } else if (name=="") {
        res.status(500).send('Name can not be empty')
    } else if (disclaimer=="") {
        res.status(500).send('Disclaimer can not be empty')
    } else if (image_url=="") {
        res.status(500).send('Image URL can not be empty')
    } else if (store_url=="") {
        res.status(500).send('Store URL can not be empty')
    } else {
        try {
            await addStore(req.body);
            res.status(201).json({ message: 'Mangaldeep store added successfully' })
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
