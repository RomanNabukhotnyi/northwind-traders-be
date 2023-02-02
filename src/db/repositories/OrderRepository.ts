import { MySqlDatabase } from 'drizzle-orm/mysql2';
import { orders, Order } from '../schema';

export class OrderRepository {
    constructor(private db: MySqlDatabase) {}

    public getAll = async (): Promise<Order[]> => {
        const result = await this.db.select(orders);
        return result;
    };
}