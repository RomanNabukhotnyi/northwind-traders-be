import { Order } from '../../db/schema';
import { OrderRepository } from '../../db/repositories/OrderRepository';
import { OrderDetailsRepository } from '../../db/repositories/OrderDetailsRepository';
import { ProductRepository } from '../../db/repositories/ProductRepository';

export class OrderService {
    constructor(private orderRepository: OrderRepository, private orderDetailsRepository: OrderDetailsRepository, private productRepository: ProductRepository) {}

    public getAll = async (): Promise<Order[]> => {
        const orders = await this.orderRepository.getAll();

        const result = [];

        for await (const order of orders) {
            const orderDetails = await this.orderDetailsRepository.getAllByOrderId(order.id!);
            const products = [];
            for await (const orderDetail of orderDetails) {
                const product = await this.productRepository.getById(orderDetail.productId!);
                products.push({
                    ...product,
                    quantity: orderDetail.quantity,
                    orderUnitPrice: orderDetail.unitPrice,
                    discount: orderDetail.discount,
                });
            }
            result.push({
                ...order,
                products,
            })
        }

        return result;
    };
}