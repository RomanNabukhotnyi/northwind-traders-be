import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq, and } from 'drizzle-orm/expressions';
import { orderDetails, OrderDetails } from '../schema';

export class OrderDetailsRepository {
  constructor(private db: MySql2Database) {}

  public create = async (
    orderId: number,
    productId: number,
    unitPrice: number,
    quantity: number,
    discount: number,
  ): Promise<OrderDetails> => {
    const [{ insertId }] = await this.db.insert(orderDetails).values({
      orderId,
      productId,
      unitPrice,
      quantity,
      discount,
    });
    const [result] = await this.db.select(orderDetails).where(eq(orderDetails.orderId, insertId));
    return result;
  };

  public getAllByOrderId = async (id: number): Promise<OrderDetails[]> => {
    const result = await this.db.select(orderDetails).where(eq(orderDetails.orderId, id));
    return result;
  };

  public update = async (
    orderId: number,
    productId: number,
    unitPrice: number,
    quantity: number,
    discount: number,
  ): Promise<OrderDetails> => {
    await this.db.update(orderDetails).set({
      unitPrice,
      quantity,
      discount,
    }).where(and(eq(orderDetails.orderId, orderId), eq(orderDetails.productId, productId)));
    const [result] = await this.db.select(orderDetails).where(and(eq(orderDetails.orderId, orderId), eq(orderDetails.productId, productId)));
    return result;
  };

  public delete = async (orderId: number, productId: number): Promise<void> => {
    await this.db.delete(orderDetails).where(and(eq(orderDetails.orderId, orderId), eq(orderDetails.productId, productId)));
  };
}
