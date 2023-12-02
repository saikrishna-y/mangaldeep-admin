
// import prisma from "src/utlis/prisma";

// interface file {
//     url: string
//     file_url: string
// }

const uploadExcelFile = async () => {

    // const { url } = data

    // to do file upload
    // try {
    //     await prisma.panchangExcelFile.create({
    //         data: {
    //             file_url: url
    //         },
    //     })

    //     return true
    // } catch (err) {
    //     return false
    // }
}

export default async function handler(req: any, res: any) {
    try {
        await uploadExcelFile();
        res.status(201).json({ message: 'File uploaded successfully' })
    } catch (e) {
        res.status(500).send(e)
    }
}
