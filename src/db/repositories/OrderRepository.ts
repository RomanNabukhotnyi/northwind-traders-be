import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm/expressions';
import { orders, Order, orderDetails } from '../schema';
import { sql } from 'drizzle-orm';

export class OrderRepository {
  constructor(private db: MySql2Database) {}

  public create = async (
    customerId: string | null | undefined,
    employeeId: number | null | undefined,
    orderDate: Date | null | undefined,
    requiredDate: Date | null | undefined,
    shippedDate: Date | null | undefined,
    shipVia: number | null | undefined,
    freight: number | null | undefined,
    shipName: string | null | undefined,
    shipAddress: string | null | undefined,
    shipCity: string | null | undefined,
    shipRegion: string | null | undefined,
    shipPostalCode: string | null | undefined,
    shipCountry: string | null | undefined,
  ): Promise<Order> => {
    const [{ insertId }] = await this.db.insert(orders).values({
      id: 0,
      customerId: customerId ?? null,
      employeeId: employeeId ?? null,
      orderDate: orderDate ?? null,
      requiredDate: requiredDate ?? null,
      shippedDate: shippedDate ?? null,
      shipVia: shipVia ?? null,
      freight: freight ?? null,
      shipName: shipName ?? null,
      shipAddress: shipAddress ?? null,
      shipCity: shipCity ?? null,
      shipRegion: shipRegion ?? null,
      shipPostalCode: shipPostalCode ?? null,
      shipCountry: shipCountry ?? null,
    });
    const [result] = await this.db.select(orders).where(eq(orders.id, insertId));
    return result;
  };

  public getAll = async (): Promise<Order[]> => {
    const [result] = await this.db.execute<Order[]>(
      sql`select sum(${orderDetails.unitPrice}*${orderDetails.discount}*${orderDetails.quantity}) as totalDiscount, sum(${orderDetails.unitPrice}*${orderDetails.quantity}) as totalPrice, sum(${orderDetails.quantity}) as totalItems, count(${orderDetails.orderId}) as totalProducts, ${orders.id}, ${orders.customerId} as customerId, ${orders.employeeId} as employeeId, ${orders.orderDate} as orderDate, ${orders.requiredDate} as requiredDate, ${orders.shippedDate} as shippedDate, ${orders.shipVia} as shipVia, ${orders.freight}, ${orders.shipName} as shipName, ${orders.shipAddress} as shipAddress, ${orders.shipCity} as shipCity, ${orders.shipRegion} as shipRegion, ${orders.shipPostalCode} as shipPostalCode, ${orders.shipCountry} as shipCountry from ${orders}, ${orderDetails} where ${orders.id} = ${orderDetails.orderId} group by ${orders.id}`,
    );
    return result as unknown as Order[];
  };
  
  public update = async (
    id: number,
    customerId: string | null | undefined,
    employeeId: number | null | undefined,
    orderDate: Date | null | undefined,
    requiredDate: Date | null | undefined,
    shippedDate: Date | null | undefined,
    shipVia: number | null | undefined,
    freight: number | null | undefined,
    shipName: string | null | undefined,
    shipAddress: string | null | undefined,
    shipCity: string | null | undefined,
    shipRegion: string | null | undefined,
    shipPostalCode: string | null | undefined,
    shipCountry: string | null | undefined,
  ): Promise<Order> => {
    await this.db.update(orders).set({
      customerId: customerId ?? null,
      employeeId: employeeId ?? null,
      orderDate: orderDate ?? null,
      requiredDate: requiredDate ?? null,
      shippedDate: shippedDate ?? null,
      shipVia: shipVia ?? null,
      freight: freight ?? null,
      shipName: shipName ?? null,
      shipAddress: shipAddress ?? null,
      shipCity: shipCity ?? null,
      shipRegion: shipRegion ?? null,
      shipPostalCode: shipPostalCode ?? null,
      shipCountry: shipCountry ?? null,
    }).where(eq(orders.id, id));
    const [result] = await this.db.select(orders).where(eq(orders.id, id));
    return result;
  };

  public delete = async (id: number): Promise<void> => {
    await this.db.delete(orders).where(eq(orders.id, id));
  };
}
