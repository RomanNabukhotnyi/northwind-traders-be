import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm/expressions';
import { suppliers, Supplier } from '../schema';

export class SupplierRepository {
    constructor(private db: MySql2Database) {}

    public create = async (
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
        homePage: string | null | undefined,
        ): Promise<Supplier> => {
        const [{insertId}] = await this.db.insert(suppliers).values({
            id: 0,
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
            homePage: homePage ?? null,
        });
        const [result] = await this.db.select(suppliers).where(eq(suppliers.id, insertId));
        return result; 
    }

    public getAll = async (): Promise<Supplier[]> => {
        const result = await this.db.select(suppliers);
        return result;
    };

    public update = async (
        id: number,
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
        homePage: string | null | undefined,
    ): Promise<Supplier> => {
        await this.db.update(suppliers).set({
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
            homePage: homePage ?? null,
        }).where(eq(suppliers.id, id));
        const [result] = await this.db.select(suppliers).where(eq(suppliers.id, id));
        return result; 
    };

    public delete = async (id: number): Promise<void> => {
        await this.db.delete(suppliers).where(eq(suppliers.id, id));
    };
}