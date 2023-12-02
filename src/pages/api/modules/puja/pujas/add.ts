import { NextApiRequest, NextApiResponse } from 'next/types'

// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient();

// interface puja {
//   name: string;
//   image_id?: number;
//   background: string;
//   puja_type: number[];
//   deities: number[];
//   locales: number[];
//   image_module_id: number;
//   puja_materials?: { name: string; optional: boolean; quantity: string; }[];
//   image_url: string;
//   is_trending_now?: boolean;
// }

// const addPuja = async (data: puja, res: NextApiResponse) => {
//   const { image_module_id, ...rest } = data

//   if (
//     !data.name ||
//     !data.background ||
//     !data.puja_type ||
//     data.puja_type.length == 0 ||
//     !data.deities ||
//     data.deities.length == 0 ||
//     !data.locales ||
//     data.locales.length == 0
//   ) {
//     return res.status(400).json({ message: 'All fields are required' })
//   }

//   if (data.image_id) {
//     const image = await prisma.images.findFirst({ where: { id: data.image_id } })
//     if (data.puja_materials && data.puja_materials.length > 0) {
//       const newPuja = await prisma.puja.create({ data: { ...rest, image_url: image?.image_url } })
//       if (data.is_trending_now) await prisma.trendingNow.create({ data: { type_id: 1, category_name: 'puja', category_id: newPuja?.id } })
//       for (const eachPujaMaterial of data.puja_materials) {
//         const { name, optional, quantity } = eachPujaMaterial
//         await prisma.pujaMaterial.create({ data: { name, optional, quantity, puja_id: newPuja.id } })
//       }

//       return res.status(201).json({ message: 'Puja added successfully' })
//     } else {
//       // await prisma
//       //   .puja
//       //   .create({ data: { ...rest, image_url: image?.image_url } })
//       //   .then(() => { return res.status(201).json({ message: 'Puja added successfully' }) })
//       //   .catch((err) => {

//       //     return res.status(400).json(err)
//       //   })

//       const newPuja = await prisma.puja.create({ data: { ...rest, image_url: image?.image_url } })
//       if (data.is_trending_now) await prisma.trendingNow.create({ data: { type_id: 1, category_name: 'puja', category_id: newPuja?.id } })

//       return res.status(201).json({ message: 'Puja added successfully' })
//     }

//     return
//   }

//   if (data?.image_url && data?.image_module_id) {
//     const existingImage = await prisma.images.findFirst({ where: { image_url: data.image_url } })
//     if (!existingImage) await prisma.images.create({ data: { image_url: data?.image_url, locales: data?.locales, image_module_id } })
//     if (data.puja_materials && data.puja_materials.length > 0) {
//       const { puja_materials, image_module_id, ...restv1 } = data
//       console.log(puja_materials, image_module_id)
//       const newPuja = await prisma.puja.create({ data: restv1 })
//       if (data.is_trending_now) await prisma.trendingNow.create({ data: { type_id: 1, category_name: 'puja', category_id: newPuja?.id } })
//       for (const eachPujaMaterial of data.puja_materials) {
//         const { name, optional, quantity } = eachPujaMaterial
//         await prisma.pujaMaterial.create({ data: { name, optional, quantity, puja_id: newPuja.id } })
//       }

//       return res.status(201).json({ message: 'Puja added successfully' })
//     } else {

//       // await prisma
//       //   .puja
//       //   .create({ data: rest })
//       //   .then(() => { return res.status(201).json({ message: 'Puja added successfully' }) })
//       //   .catch((err) => {
//       //     console.log('addPuja => 74 => err =>', err)

//       //     return res.status(400).json(err)
//       //   })

//       const newPuja = await prisma.puja.create({ data: rest })
//       if (data.is_trending_now) await prisma.trendingNow.create({ data: { type_id: 1, category_name: 'puja', category_id: newPuja?.id } })

//       return res.status(201).json({ message: 'Puja added successfully' })
//     }
//   }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    // await addPuja(req.body, res);
  } catch (e) {
    res.status(500).send(e)
  }
}