
import prisma from "src/utlis/prisma";

interface shlokas {
    name: string;
    deity_id: number;
    content: string;
    pronunciation: string,
    description_text: string;
    url: string;
    locales: string;
    audio_url: string;
    id: number;
}

const editShloka = async (data: shlokas) => {
    const {
        name,
        deity_id,
        content,
        pronunciation,
        description_text,
        locales,
        id
    } = data
    try {
        await prisma.shlokas.update({
            where: { id },
            data: {
                name,
                deity_id,
                content,
                pronunciation,
                description_text,
                locales
            }
        })

        return true
    } catch (err) {
        return false
    }
}

export default async function handler(req: any, res: any) {

    if (!req?.body) {
        res.status(500).send('Fields can not be empty')
    } else {
        try {
            await editShloka(req.body);
            res.status(201).json({ message: 'Shloka updated successfully' })
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
