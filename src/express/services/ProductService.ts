import { Product } from '../../db/schema';
import { ProductRepository } from '../../db/repositories/ProductRepository';

export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    public getAll = async (): Promise<Product[]> => {
        const result = await this.productRepository.getAll();
        return result;
    };
}