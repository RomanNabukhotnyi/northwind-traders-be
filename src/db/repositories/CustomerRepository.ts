import { MySqlDatabase } from 'drizzle-orm/mysql2';
import { customers, Customer } from '../schema';

export class CustomerRepository {
    constructor(private db: MySqlDatabase) {}

    public getAll = async (): Promise<Customer[]> => {
        const result = await this.db.select(customers);
        return result;
    };
}