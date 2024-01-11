import prismaClient from '../prisma'

interface CreateCustumerProps {
  name: string
  email: string
}

class CreateCustumerService {
  async execute({ name, email }: CreateCustumerProps) {
    if (!name || !email) {
      throw new Error('Preencha todos os campos')
    }

    const costomer = await prismaClient.custumer.create({
        data:{
            name,
            email,
            status: true
        }
    })

    return costomer
  }
}

export { CreateCustumerService }
