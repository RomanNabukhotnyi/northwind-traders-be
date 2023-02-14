import { z } from 'zod';

export const apiCreateProductSchema = z.object({
    name: z.string().min(1).max(40),
    supplierId: z.number().int().min(1).nullish(),
    categoryId: z.number().int().min(1).nullish(),
    quantityPerUnit: z.string().min(1).max(20).nullish(),
    unitPrice: z.number().min(0).max(1000000).nullish(),
    unitsInStock: z.number().int().min(0).max(32767).nullish(),
    unitsOnOrder: z.number().int().min(0).max(32767).nullish(),
    reorderLevel: z.number().int().min(0).max(32767).nullish(),
    discontinued: z.boolean(),
});

export type ApiCreateProduct = z.infer<typeof apiCreateProductSchema>;
