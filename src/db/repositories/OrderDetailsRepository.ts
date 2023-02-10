import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm/expressions';
import { orderDetails, OrderDetails } from '../schema';

export class OrderDetailsRepository {
  constructor(private db: MySql2Database) {}

  public getAllByOrderId = async (id: number): Promise<OrderDetails[]> => {
    const result = await this.db.select(orderDetails).where(eq(orderDetails.orderId, id));
    return result;
  };
}
