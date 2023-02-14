import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm/expressions';
import { employees, Employee } from '../schema';

export class EmployeeRepository {
    constructor(private db: MySql2Database) {}

    public create = async (
        lastName: string,
        firstName: string,
        title: string | null | undefined,
        titleOfCourtesy: string | null | undefined,
        birthDate: Date | null | undefined,
        hireDate: Date | null | undefined,
        address: string | null | undefined,
        city: string | null | undefined,
        region: string | null | undefined,
        postalCode: string | null | undefined,
        country: string | null | undefined,
        homePhone: string | null | undefined,
        extension: string | null | undefined,
        photo: string | null | undefined,
        notes: string | null | undefined,
        reportsTo: number | null | undefined,
        photoPath: string | null | undefined,
    ): Promise<Employee> => {
        const [{insertId}] = await this.db.insert(employees).values({
            id: 0,
            lastName,
            firstName,
            title: title ?? null,
            titleOfCourtesy: titleOfCourtesy ?? null,
            birthDate: birthDate ?? null,
            hireDate: hireDate ?? null,
            address: address ?? null,
            city: city ?? null,
            region: region ?? null,
            postalCode: postalCode ?? null,
            country: country ?? null,
            homePhone: homePhone ?? null,
            extension: extension ?? null,
            photo: photo ?? null,
            notes: notes ?? null,
            reportsTo: reportsTo ?? null,
            photoPath: photoPath ?? null,
        });
        const [result] = await this.db.select(employees).where(eq(employees.id, insertId));
        return result;
    };

    public getAll = async (): Promise<Employee[]> => {
        const result = await this.db.select(employees);
        return result;
    };

    public update = async (
        id: number,
        lastName: string,
        firstName: string,
        title: string | null | undefined,
        titleOfCourtesy: string | null | undefined,
        birthDate: Date | null | undefined,
        hireDate: Date | null | undefined,
        address: string | null | undefined,
        city: string | null | undefined,
        region: string | null | undefined,
        postalCode: string | null | undefined,
        country: string | null | undefined,
        homePhone: string | null | undefined,
        extension: string | null | undefined,
        photo: string | null | undefined,
        notes: string | null | undefined,
        reportsTo: number | null | undefined,
        photoPath: string | null | undefined,
    ): Promise<Employee> => {
        await this.db.update(employees).set({
            lastName,
            firstName,
            title: title ?? null,
            titleOfCourtesy: titleOfCourtesy ?? null,
            birthDate: birthDate ?? null,
            hireDate: hireDate ?? null,
            address: address ?? null,
            city: city ?? null,
            region: region ?? null,
            postalCode: postalCode ?? null,
            country: country ?? null,
            homePhone: homePhone ?? null,
            extension: extension ?? null,
            photo: photo ?? null,
            notes: notes ?? null,
            reportsTo: reportsTo ?? null,
            photoPath: photoPath ?? null,
        }).where(eq(employees.id, id));
        const [result] = await this.db.select(employees).where(eq(employees.id, id));
        return result;
    };

    public delete = async (id: number): Promise<void> => {
        await this.db.delete(employees).where(eq(employees.id, id));
    };
}