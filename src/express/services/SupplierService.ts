import { Supplier } from '../../db/schema';
import { SupplierRepository } from '../../db/repositories/SupplierRepository';
import { apiCreateSupplierSchema, ApiCreateSupplier } from '../dtos/suppliers/requests/ApiCreateSupplier';

export class SupplierService {
    constructor(private supplierRepository: SupplierRepository) {}

    public create = async (supplier: ApiCreateSupplier): Promise<Supplier> => {
        const result = await this.supplierRepository.create(
            supplier.companyName,
            supplier.contactName,
            supplier.contactTitle,
            supplier.address,
            supplier.city,
            supplier.region,
            supplier.postalCode,
            supplier.country,
            supplier.phone,
            supplier.fax,
            supplier.homePage,
        );
        return result;
    };

    public getAll = async (): Promise<Supplier[]> => {
        const result = await this.supplierRepository.getAll();
        return result;
    };

    public delete = async (id: number): Promise<void> => {
        await this.supplierRepository.delete(id);
    }
}