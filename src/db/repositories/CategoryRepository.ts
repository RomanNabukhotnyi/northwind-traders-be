import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm/expressions';
import { categories, Category } from '../schema';

export class CategoryRepository {
    constructor(private db: MySql2Database) {}

    public getAll = async (): Promise<Category[]> => {
        const result = await this.db.select(categories);
        return result;
    }
}