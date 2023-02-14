import { Category } from '../../db/schema';
import { CategoryRepository } from '../../db/repositories/CategoryRepository';

export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) {}

    public getAll = async (): Promise<Category[]> => {
        const result = await this.categoryRepository.getAll();
        return result;
    };
}
