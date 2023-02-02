import { Supplier } from '../../db/schema';
import { SupplierRepository } from '../../db/repositories/SupplierRepository';

export class SupplierService {
    constructor(private supplierRepository: SupplierRepository) {}

    public getAll = async (): Promise<Supplier[]> => {
        const result = await this.supplierRepository.getAll();
        return result;
    };
}