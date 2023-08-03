import { Order } from "../../domain/entities/Order";

export interface IOrderRepository {
  findAll(): Promise<Order[]>
  addFetchOrderHistory(date: Date): Promise<void>
  getLastOrderDate(): Promise<Date | null>
  createBatchOrders(product: Order[]): Promise<void>
}