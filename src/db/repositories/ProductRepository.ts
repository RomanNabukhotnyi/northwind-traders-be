import { MySqlDatabase } from 'drizzle-orm/mysql2';
import { products, Product } from '../schema';

export class ProductRepository {
    constructor(private db: MySqlDatabase) {}

    public getAll = async (): Promise<Product[]> => {
        const result = await this.db.select(products);
        return result;
    };
}