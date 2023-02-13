import { z } from 'zod';

export const apiCreateSupplierSchema = z.object({
    companyName: z.string().min(1).max(40),
    contactName: z.string().min(1).max(30).nullish(),
    contactTitle: z.string().min(1).max(30).nullish(),
    address: z.string().min(1).max(60).nullish(),
    city: z.string().min(1).max(15).nullish(),
    region: z.string().min(1).max(15).nullish(),
    postalCode: z.string().min(1).max(10).nullish(),
    country: z.string().min(1).max(15).nullish(),
    phone: z.string().min(1).max(24).nullish(),
    fax: z.string().min(1).max(24).nullish(),
    homePage: z.string().min(1).nullish(),
});

export type ApiCreateSupplier = z.infer<typeof apiCreateSupplierSchema>;