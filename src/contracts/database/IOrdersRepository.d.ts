import { Order } from "../../domain/entities/Order";

export interface IOrderRepository {
  findAll({ page: number }): Promise<Order[]>
  addFetchOrderHistory(date: Date): Promise<void>
  getLastOrderDate(): Promise<Date | null>
  createBatchOrders(product: Order[]): Promise<number>
}