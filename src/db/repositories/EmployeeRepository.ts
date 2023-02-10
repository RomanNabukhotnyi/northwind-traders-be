import { MySql2Database } from 'drizzle-orm/mysql2';
import { employees, Employee } from '../schema';

export class EmployeeRepository {
    constructor(private db: MySql2Database) {}

    public getAll = async (): Promise<Employee[]> => {
        const result = await this.db.select(employees);
        return result;
    };
}