import { Employee } from '../../db/schema';
import { EmployeeRepository } from '../../db/repositories/EmployeeRepository';

export class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    public getAll = async (): Promise<Employee[]> => {
        const result = await this.employeeRepository.getAll();
        return result;
    };
}