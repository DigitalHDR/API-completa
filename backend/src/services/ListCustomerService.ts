import prismaClient from '../prisma'

class ListCustomerService {
  async execute() {
    const customers = await prismaClient.custumer.findMany()
    return customers
  }
}

export { ListCustomerService }
