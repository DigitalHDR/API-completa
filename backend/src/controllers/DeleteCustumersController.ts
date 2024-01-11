import { FastifyRequest, FastifyReply } from 'fastify'
import { DeleteCustumersService } from '../services/DeleteCustumersService'

class DeleteCustumersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const custumerService = new DeleteCustumersService()

    const custumer = await custumerService.execute({ id })

    reply.send(custumer)
  }
}

export { DeleteCustumersController }
