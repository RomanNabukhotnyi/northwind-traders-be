import { Customer } from '../../db/schema';
import { CustomerRepository } from '../../db/repositories/CustomerRepository';
import { ApiCreateCustomer } from '../dtos/customers/ApiCreateCustomer';
import { createId } from '../utils/id';

export class CustomerService {
    constructor(private customerRepository: CustomerRepository) {}

    public create = async (customer: ApiCreateCustomer): Promise<Customer> => {
        const id = createId();
        console.log('id: ', id);
        const result = await this.customerRepository.create(
            id,
            customer.companyName,
            customer.contactName,
            customer.contactTitle,
            customer.address,
            customer.city,
            customer.region,
            customer.postalCode,
            customer.country,
            customer.phone,
            customer.fax,
        );
        return result;
    };

    public getAll = async (): Promise<Customer[]> => {
        const result = await this.customerRepository.getAll();
        return result;
    };

    public update = async (id: string, customer: ApiCreateCustomer): Promise<Customer> => {
        const result = await this.customerRepository.update(
            id,
            customer.companyName,
            customer.contactName,
            customer.contactTitle,
            customer.address,
            customer.city,
            customer.region,
            customer.postalCode,
            customer.country,
            customer.phone,
            customer.fax,
        );
        return result;
    };

    public delete = async (id: string): Promise<void> => {
        await this.customerRepository.delete(id);
    };
}