import { MySqlDatabase } from 'drizzle-orm/mysql2';
import { employees, Employee } from '../schema';

export class EmployeeRepository {
    constructor(private db: MySqlDatabase) {}

    public getAll = async (): Promise<Employee[]> => {
        const result = await this.db.select(employees);
        return result;
    };
}