import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "src/utlis/prisma";


const getGeetAudio = async () => {
    const results = await prisma.geetaAudio.findMany({})

    // if (results.length > 0) {
    // const languages = await prisma.languages.findMany({
    //     where: {
    //         id: {
    //             in: JSON.parse(JSON.stringify(d?.languages))
    //         }
    //     },
    // })
    // const geet_quote = await prisma.geetaQuotes.findMany({
    //     where: {
    //         id: {
    //             in: JSON.parse(JSON.stringify(d?.geeta_quotes))
    //         }
    //     },
    // })
    //     const finalData = results.map(data => {
    //         const languages_data = languages.map(d => {
    //             return d
    //         })
    //         const geet_data = geet_quote.map(d => {
    //             return d
    //         })

    //         return {
    //             ...data,
    //             languages: languages_data,
    //             geeta_quotes: geet_data
    //         }
    //     })

    //     return finalData
    // } 
    if (results.length > 0) {
        const finalData = [];
        for (const d of results) {
            
            // const languages = await prisma.languages.findMany({
            //     where: {
            //         id: {
            //             in: JSON.parse(JSON.stringify(d?.languages))
            //         }
            //     },
            // })
            // const geet_quote = await prisma.geetaQuotes.findMany({
            //     where: {
            //         id: {
            //             in: JSON.parse(JSON.stringify(d?.geeta_quotes))
            //         }
            //     },
            // })
            const params: any = { ...d }

            // params.languages = languages
            // params.geeta_quotes = geet_quote
            finalData.push(params)
        }

        return finalData
    }
    else {
        return results || false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await getGeetAudio();
        if (response) {
            res.status(201).json(response)
        } else {
            res.status(400)
        }
    } catch (e: any) {
        res.status(500).send(e.toString())
    }
}