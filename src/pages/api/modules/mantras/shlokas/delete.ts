
import prisma from "src/utlis/prisma";

interface mantras {
    id: number
}

const deleteShloka = async (data: mantras) => {
    const { id } = data
    try {
        await prisma.shlokas.delete({
            where: {
                id
            },
        })

        return true
    } catch (err) {
        return false
    }
}

export default async function handler(req: any, res: any) {
    try {
        await deleteShloka(req.body);
        res.status(201).json({ message: 'Shloka deleted successfully' })
    } catch (e) {
        res.status(500).send(e)
    }
}
