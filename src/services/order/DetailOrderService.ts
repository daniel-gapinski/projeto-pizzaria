import prismaClient from "../../prisma";

interface DetailRequest {
    order_id: string;
}

class DetailOrderService {

    async execute({ order_id }: DetailRequest) {

        const orders = await prismaClient.item.findMany({
            where: {
                order_id: order_id,
            },
            include: { //Buscar as informações do produto além do ID, trazendo todas as informações
                product: true,
                order: true,
            }
        });

        return orders;
    }
}

export { DetailOrderService };