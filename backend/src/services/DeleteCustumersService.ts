import prismaClient from "../prisma"

interface DeleteCustomerProps {
    id: string
}

class DeleteCustumersService {
    async execute({id}: DeleteCustomerProps) {
        if(!id) {
            throw new Error("solicitação invalida")
        }

        const findCustomer = await prismaClient.custumer.findFirst({
            where: {
                id: id
            }
        })

        if(!findCustomer) {
            throw new Error("Cliente não existe")
        }

        await prismaClient.custumer.delete({
            where:{
                id: findCustomer.id
            }
        })

        return { menssage: "Deletado com sucesso!"}
    }
}


export {DeleteCustumersService}