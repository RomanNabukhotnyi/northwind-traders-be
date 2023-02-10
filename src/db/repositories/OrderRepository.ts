import { MySql2Database } from 'drizzle-orm/mysql2';
import { orders, Order, orderDetails, products } from '../schema';
import { sql } from 'drizzle-orm';

export class OrderRepository {
  constructor(private db: MySql2Database) {}

  public getAll = async (): Promise<Order[]> => {
    const [result] = await this.db.execute<Order[]>(
      sql`select sum(${orderDetails.unitPrice}*${orderDetails.discount}*${orderDetails.quantity}) as totalDiscount, sum(${orderDetails.unitPrice}*${orderDetails.quantity}) as totalPrice, sum(${orderDetails.quantity}) as totalItems, count(${orderDetails.orderId}) as totalProducts, ${orders.id}, ${orders.customerId} as customerId, ${orders.employeeId} as employeeId, ${orders.orderDate} as orderDate, ${orders.requiredDate} as requiredDate, ${orders.shippedDate} as shippedDate, ${orders.shipVia} as shipVia, ${orders.freight}, ${orders.shipName} as shipName, ${orders.shipAddress} as shipAddress, ${orders.shipCity} as shipCity, ${orders.shipRegion} as shipRegion, ${orders.shipPostalCode} as shipPostalCode, ${orders.shipCountry} as shipCountry from ${orders}, ${orderDetails} where ${orders.id} = ${orderDetails.orderId} group by ${orders.id}`,
    );
    return result as unknown as Order[];
  };
}
