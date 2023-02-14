import { Employee } from '../../db/schema';
import { EmployeeRepository } from '../../db/repositories/EmployeeRepository';
import { ApiCreateEmployee } from '../dtos/employees/ApiCreateEmployee';

export class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    public create = async (employee: ApiCreateEmployee): Promise<Employee> => {
        const result = await this.employeeRepository.create(
            employee.lastName,
            employee.firstName,
            employee.title,
            employee.titleOfCourtesy,
            employee.birthDate,
            employee.hireDate,
            employee.address,
            employee.city,
            employee.region,
            employee.postalCode,
            employee.country,
            employee.homePhone,
            employee.extension,
            employee.photo,
            employee.notes,
            employee.reportsTo,
            employee.photoPath,
        );
        return result;
    };

    public getAll = async (): Promise<Employee[]> => {
        const result = await this.employeeRepository.getAll();
        return result;
    };

    public update = async (id: number, employee: ApiCreateEmployee): Promise<Employee> => {
        const result = await this.employeeRepository.update(
            id,
            employee.lastName,
            employee.firstName,
            employee.title,
            employee.titleOfCourtesy,
            employee.birthDate,
            employee.hireDate,
            employee.address,
            employee.city,
            employee.region,
            employee.postalCode,
            employee.country,
            employee.homePhone,
            employee.extension,
            employee.photo,
            employee.notes,
            employee.reportsTo,
            employee.photoPath,
        );
        return result;
    };

    public delete = async (id: number): Promise<void> => {
        await this.employeeRepository.delete(id);
    };
}