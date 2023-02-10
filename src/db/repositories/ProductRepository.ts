import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm/expressions';
import { products, Product, suppliers } from '../schema';

export class ProductRepository {
    constructor(private db: MySql2Database) {}

    public getAll = async (): Promise<Product[]> => {
        const result = await this.db.select(products).fields({
            ...products,
            supplierName: suppliers.contactName,
        }).leftJoin(suppliers, eq(products.supplierId, suppliers.id));
        return result;
    };

    public getById = async (id: number): Promise<Product> => {
        const [result] = await this.db.select(products).where(eq(products.id, id));
        return result;
    };
}