import { NextApiRequest, NextApiResponse } from 'next/types'

/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "src/utlis/prisma";

const getMostPlayedSong = async (req: NextApiRequest, res: NextApiResponse) => {
    // const results = await prisma.devotionalSongs.findMany({
    //     where: {
    //         is_famous_song: true
    //     },
    // })

    // if (results.length > 0) {
    //     const finalData = [];
    //     for (const d of results) {
    //         const locales = await prisma.locales.findMany({
    //             where: {
    //                 id: {
    //                     in: JSON.parse(JSON.stringify(d.locales))
    //                 }
    //             },
    //         })
    //         const deity = await prisma.deities.findMany({
    //             where: {
    //                 id: {
    //                     in: JSON.parse(JSON.stringify(d.deities))
    //                 }
    //             },
    //             include: {
    //                 Images: true
    //             }
    //         })
    //         const params: any = { ...d }
    //         params.locales = locales;
    //         params.deities = deity;
    //         finalData.push(params)
    //     }

    //     return finalData
    // }
    // else {
    //     return results
    // }
    const results = await prisma.devotionalSongs.findMany({})

    if (results.length > 0) {
        const finalData = [];
        for (const d of results) {
            const locales = await prisma.locales.findMany({
                where: {
                    id: {
                        in: JSON.parse(JSON.stringify(d.locales))
                    }
                },
            })
            const deity = await prisma.deities.findMany({
                where: {
                    id: {
                        in: JSON.parse(JSON.stringify(d.deities))
                    }
                },
                include: {
                    Images: true
                }
            })
            const params: any = { ...d }
            params.locales = locales;
            params.deities = deity;
            finalData.push(params)
        }

        return finalData
    }
    else {
        return results
    }

    // MY LOGIC
    // const mostPlayedSongs = await prisma.mostPlayedSongs.findMany({})
    // const devotionalSongs = await prisma.devotionalSongs.findMany({})
    // const results = []
    // for (const dsong of devotionalSongs) {
    //     // devotionalSongs.filter((dsong) => dsong.id)
    //     for (const song of mostPlayedSongs) {
    //         if (song.songs.includes(dsong.id)) {
    //             results.push(dsong)
    //         }
    //     }
    // }

    // const filteredArray = results.filter((item, index, self) => {
    //     return index === self.findIndex((t) => (
    //         t.id === item.id
    //     ));
    // });

    // if (filteredArray.length > 0) {
    //     const finalData = [];
    //     for (const d of filteredArray) {
    //         const locales = await prisma.locales.findMany({
    //             where: {
    //                 id: {
    //                     in: JSON.parse(JSON.stringify(d.locales))
    //                 }
    //             },
    //         })
    //         const deity = await prisma.deities.findMany({
    //             where: {
    //                 id: {
    //                     in: JSON.parse(JSON.stringify(d.deities))
    //                 }
    //             },
    //             include: {
    //                 Images: true
    //             }
    //         })
    //         const params: any = { ...d }
    //         params.locales = locales;
    //         params.deities = deity;
    //         finalData.push(params)
    //     }

    //     return finalData
    // }
    // else {
    //     return filteredArray
    // }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await getMostPlayedSong(req, res);
        if (response) {
            res.status(200).json(response)
        } else {
            res.status(400)
        }
    } catch (e: any) {
        res.status(500).send(e.toString())
    }
}