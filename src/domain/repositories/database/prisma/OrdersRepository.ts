import { PrismaClient } from "@prisma/client";
import { IOrderRepository } from "../../../../contracts/database/IOrdersRepository";
import { Order } from "../../../entities/Order";

export class PrismaOrdersRepository implements IOrderRepository {
  database: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.database = prismaClient
  }

  async findAll(): Promise<Order[]> {
    const orderList = await this.database.order.findMany({ include: { line_items: true } })
    const orderArray: Order[] = []
    for (const order of orderList) {
      orderArray.push(new Order(order))
    }
    return orderArray
  }

  async addFetchOrderHistory(date: Date): Promise<void> {
    await this.database.orderFetchHistory.create({ data: { last_order_date: date } })
  }
  async getLastOrderDate(): Promise<Date | null> {
    const latestOrder = await this.database.orderFetchHistory.findFirst({
      orderBy: { last_order_date: "desc" },
    });

    return latestOrder ? latestOrder.last_order_date : null;
  }
  async createBatchOrders(orders: Order[]): Promise<number> {
    for (const order of orders) {
      const newOrder = await this.database.order.create({ data: { id: order.id, platform_id: order.platform_id } })
      for (const item of order.line_items) {
        const product = await this.database.product.findUnique({ where: { id: item.product_id } })
        if (!product) continue
        await this.database.orderProducts.create({ data: { order_id: newOrder.id, product_id: product.id } })
      }
    }
    return orders.length
  }
}