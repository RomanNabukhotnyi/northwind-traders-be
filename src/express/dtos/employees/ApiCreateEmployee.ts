import { z } from 'zod';

export const apiCreateEmployeeSchema = z.object({
    lastName: z.string().min(1).max(20),
    firstName: z.string().min(1).max(10),
    title: z.string().min(1).max(30).nullish(),
    titleOfCourtesy: z.string().min(1).max(25).nullish(),
    birthDate: z.date().nullish(),
    hireDate: z.date().nullish(),
    address: z.string().min(1).max(60).nullish(),
    city: z.string().min(1).max(15).nullish(),
    region: z.string().min(1).max(15).nullish(),
    postalCode: z.string().min(1).max(10).nullish(),
    country: z.string().min(1).max(15).nullish(),
    homePhone: z.string().min(1).max(24).nullish(),
    extension: z.string().min(1).max(4).nullish(),
    photo: z.string().min(1).nullish(),
    notes: z.string().min(1).nullish(),
    reportsTo: z.number().nullish(),
    photoPath: z.string().min(1).nullish(),
});

export type ApiCreateEmployee = z.infer<typeof apiCreateEmployeeSchema>;