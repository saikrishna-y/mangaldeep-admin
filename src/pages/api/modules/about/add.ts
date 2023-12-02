import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T
}

const prisma = new PrismaClient()

interface aboutAttributes {
  category: string;
  description: string;
}

const addAbout = async (req: ExtendedNextApiRequest<aboutAttributes>, res: NextApiResponse) => {
  
  const { category, description} = req.body
  if (
    !category ||
    !description
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const newAbout = await prisma.about.create({data:
     {
      category,
      description
  }})
  console.log(newAbout)

  return res.status(201).json({ message: 'About added successfully' })
}

export default async function handler(req: ExtendedNextApiRequest<aboutAttributes>, res: NextApiResponse) {
  try {
    await addAbout(req, res)
  } catch (e) {
    
    return res.status(400).json(e)
  }
}