import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm/expressions';
import { customers, Customer } from '../schema';

export class CustomerRepository {
    constructor(private db: MySql2Database) {}

    public create = async (
        id: string,
        companyName: string,
        contactName: string | null | undefined,
        contactTitle: string | null | undefined,
        address: string | null | undefined,
        city: string | null | undefined,
        region: string | null | undefined,
        postalCode: string | null | undefined,
        country: string | null | undefined,
        phone: string | null | undefined,
        fax: string | null | undefined,
        ): Promise<Customer> => {
        const [{insertId}] = await this.db.insert(customers).values({
            id,
            companyName,
            contactName: contactName ?? null,
            contactTitle: contactTitle ?? null,
            address: address ?? null,
            city: city ?? null,
            region: region ?? null,
            postalCode: postalCode ?? null,
            country: country ?? null,
            phone: phone ?? null,
            fax: fax ?? null,
        });
        const [result] = await this.db.select(customers).where(eq(customers.id, String(insertId)));
        return result;
    };

    public getAll = async (): Promise<Customer[]> => {
        const result = await this.db.select(customers);
        return result;
    };

    public update = async (
        id: string,
        companyName: string,
        contactName: string | null | undefined,
        contactTitle: string | null | undefined,
        address: string | null | undefined,
        city: string | null | undefined,
        region: string | null | undefined,
        postalCode: string | null | undefined,
        country: string | null | undefined,
        phone: string | null | undefined,
        fax: string | null | undefined,
    ): Promise<Customer> => {
        await this.db.update(customers).set({
            companyName,
            contactName: contactName ?? null,
            contactTitle: contactTitle ?? null,
            address: address ?? null,
            city: city ?? null,
            region: region ?? null,
            postalCode: postalCode ?? null,
            country: country ?? null,
            phone: phone ?? null,
            fax: fax ?? null,
        }).where(eq(customers.id, id));
        const [result] = await this.db.select(customers).where(eq(customers.id, id));
        return result;
    };

    public delete = async (id: string): Promise<void> => {
        await this.db.delete(customers).where(eq(customers.id, id));
    };
}