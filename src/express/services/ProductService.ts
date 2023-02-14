import { Product } from '../../db/schema';
import { ProductRepository } from '../../db/repositories/ProductRepository';
import { ApiCreateProduct } from '../dtos/products/ApiCreateProduct';

export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    public create = async (product: ApiCreateProduct): Promise<Product> => {
        const result = await this.productRepository.create(
            product.name,
            product.supplierId,
            product.categoryId,
            product.quantityPerUnit,
            product.unitPrice,
            product.unitsInStock,
            product.unitsOnOrder,
            product.reorderLevel,
            product.discontinued,
        );
        return result;
    };

    public getAll = async (): Promise<Product[]> => {
        const result = await this.productRepository.getAll();
        return result;
    };

    public update = async (id: number, product: ApiCreateProduct): Promise<Product> => {
        const result = await this.productRepository.update(
            id,
            product.name,
            product.supplierId,
            product.categoryId,
            product.quantityPerUnit,
            product.unitPrice,
            product.unitsInStock,
            product.unitsOnOrder,
            product.reorderLevel,
            product.discontinued,
        );
        return result;
    };

    public delete = async (id: number): Promise<void> => {
        await this.productRepository.delete(id);
    }
}