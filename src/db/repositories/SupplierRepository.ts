import { MySqlDatabase } from 'drizzle-orm/mysql2';
import { suppliers, Supplier } from '../schema';

export class SupplierRepository {
    constructor(private db: MySqlDatabase) {}

    public getAll = async (): Promise<Supplier[]> => {
        const result = await this.db.select(suppliers);
        return result;
    };
}