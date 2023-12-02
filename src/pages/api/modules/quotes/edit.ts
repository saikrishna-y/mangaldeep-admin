import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from "src/utlis/prisma";

interface onboardingQuotes {
    id: number,
    description: string
}

const editOnboardingQuotes = async (data: onboardingQuotes) => {
    const {
        id,
        description
    } = data
    try {
        await prisma.onboardingquotes.update({
            where: { id },
            data: {
                description
            }
        })
        
        return true
    } catch (err) {
        return false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (!req?.body) {
        res.status(500).send('Fields can not be empty')
    } else {
        try {
            await editOnboardingQuotes(req.body);
            res.status(201).json({ message: 'Onboarding quotes updated successfully' })
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
