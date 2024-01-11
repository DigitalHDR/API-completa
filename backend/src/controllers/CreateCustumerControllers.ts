import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateCustumerService } from '../services/CreateCustumerServices'

class CreateCustumerControllers {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = request.body as { name: string; email: string }

    const customerServices = new CreateCustumerService()
    const customer = await customerServices.execute({ name, email })
    reply.send(customer)
  }
}

export { CreateCustumerControllers }
