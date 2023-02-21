import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm/expressions';
import { products, Product, suppliers } from '../schema';
import { sql } from 'drizzle-orm';
import { ApiTotalProductsSold } from '../../express/dtos/products/ApiTotalProductsSold';

export class ProductRepository {
    constructor(private db: MySql2Database) {}

    public create = async (
        name: string,
        supplierId: number | null | undefined,
        categoryId: number | null | undefined,
        quantityPerUnit: string | null | undefined,
        unitPrice: number | null | undefined,
        unitsInStock: number | null | undefined,
        unitsOnOrder: number | null | undefined,
        reorderLevel: number | null | undefined,
        discontinued: boolean,
    ): Promise<Product> => {
        const [{insertId}] = await this.db.insert(products).values({
            id: 0,
            name,
            supplierId: supplierId ?? null,
            categoryId: categoryId ?? null,
            quantityPerUnit: quantityPerUnit ?? null,
            unitPrice: unitPrice ?? null,
            unitsInStock: unitsInStock ?? null,
            unitsOnOrder: unitsOnOrder ?? null,
            reorderLevel: reorderLevel ?? null,
            discontinued,
        });
        const [result] = await this.db.select(products).fields({
            ...products,
            supplierName: suppliers.contactName,
        }).leftJoin(suppliers, eq(products.supplierId, suppliers.id)).where(eq(products.id, insertId));
        return result;
    };

    public getAll = async (): Promise<Product[]> => {
        const result = await this.db.select(products).fields({
            ...products,
            supplierName: suppliers.contactName,
        }).leftJoin(suppliers, eq(products.supplierId, suppliers.id));
        return result;
    };

    public getTotalProductsSold = async (): Promise<ApiTotalProductsSold[]> => {
        const result = await this.db.execute<ApiTotalProductsSold[]>(sql`CALL totalProductsSold();`);
        const data = (result as any)[0][0];
        return data as unknown as ApiTotalProductsSold[];
    };

    public getById = async (id: number): Promise<Product> => {
        const [result] = await this.db.select(products).where(eq(products.id, id));
        return result;
    };

    public update = async (
        id: number,
        name: string,
        supplierId: number | null | undefined,
        categoryId: number | null | undefined,
        quantityPerUnit: string | null | undefined,
        unitPrice: number | null | undefined,
        unitsInStock: number | null | undefined,
        unitsOnOrder: number | null | undefined,
        reorderLevel: number | null | undefined,
        discontinued: boolean,
    ): Promise<Product> => {
        await this.db.update(products).set({
            name,
            supplierId: supplierId ?? null,
            categoryId: categoryId ?? null,
            quantityPerUnit: quantityPerUnit ?? null,
            unitPrice: unitPrice ?? null,
            unitsInStock: unitsInStock ?? null,
            unitsOnOrder: unitsOnOrder ?? null,
            reorderLevel: reorderLevel ?? null,
            discontinued,
        }).where(eq(products.id, id));
        const [result] = await this.db.select(products).fields({
            ...products,
            supplierName: suppliers.contactName,
        }).leftJoin(suppliers, eq(products.supplierId, suppliers.id)).where(eq(products.id, id));
        return result;
    }

    public delete = async (id: number): Promise<void> => {
        await this.db.delete(products).where(eq(products.id, id));
    }
}