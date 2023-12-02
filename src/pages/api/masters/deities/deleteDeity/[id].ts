import prisma from "src/utlis/prisma"


const handler = async (req: any, res: any) => {
  const { id } = req.query

  if (!id) {
    res.status(401).send('Error deity id cannot be empty')
  }

  try {
    await prisma.deities.delete({ where: { id: parseInt(id) } })
    res.status(200).send(`Deity with id ${id} deleted successfuly`)
  } catch (err) {
    res.status(500).send({ message: err || 'Error deleting the deity' })
  }
}

export default handler
