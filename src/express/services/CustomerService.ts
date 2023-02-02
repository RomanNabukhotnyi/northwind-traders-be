import { Customer } from '../../db/schema';
import { CustomerRepository } from '../../db/repositories/CustomerRepository';

export class CustomerService {
    constructor(private customerRepository: CustomerRepository) {}

    public getAll = async (): Promise<Customer[]> => {
        const result = await this.customerRepository.getAll();
        return result;
    };
}