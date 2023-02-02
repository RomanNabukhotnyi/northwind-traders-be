import { Order } from '../../db/schema';
import { OrderRepository } from '../../db/repositories/OrderRepository';

export class OrderService {
    constructor(private orderRepository: OrderRepository) {}

    public getAll = async (): Promise<Order[]> => {
        const result = await this.orderRepository.getAll();
        return result;
    };
}