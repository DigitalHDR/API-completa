import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from 'fastify'
import { CreateCustumerControllers } from './controllers/CreateCustumerControllers'
import { ListCustomerController } from './controllers/ListCustomerController'
import { DeleteCustumersController } from './controllers/DeleteCustumersController'

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get(
    '/teste',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { ok: 'true' }
    }
  )

  fastify.post(
    '/customer',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateCustumerControllers().handle(request, reply)
    }
  )

  fastify.get(
    '/customers',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomerController().handle(request, reply)
    }
  )

  fastify.delete(
    '/customer',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteCustumersController().handle(request, reply)
    }
  )
}
