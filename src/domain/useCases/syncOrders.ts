import { v4 } from "uuid";
import { IShopOrdersApi } from "../../contracts/apis/ShopOrdersApi";
import { IOrderRepository } from '../../contracts/database/IOrdersRepository';
import { Order } from "../entities/Order";

export class SyncOrdersUseCase {
  ordersApi: IShopOrdersApi
  ordersRepository: IOrderRepository
  constructor(ordersApi: IShopOrdersApi, ordersRepository: IOrderRepository) {
    this.ordersApi = ordersApi
    this.ordersRepository = ordersRepository
  }

  async execute() {
    const lastFetch = await this.ordersRepository.getLastOrderDate()

    const orders = await this.ordersApi.fetchOrders(lastFetch)
    if (!orders.length) return []

    const orderEntityArray: Order[] = []
    for (const order of orders) {
      const index = order.line_items.findIndex((lineItem: any) => !lineItem.product_id)
      if (index !== -1) {
        console.log(`Order with id ${order.id} skipped because one or more line_items has no product_id`)
        continue
      }
      const orderEntity = new Order({ id: v4(), platform_id: order.id, line_items: order.line_items })
      orderEntityArray.push(orderEntity)
    }
    if (!orderEntityArray.length)
      await this.ordersRepository.createBatchOrders(orderEntityArray)

    await this.ordersRepository.addFetchOrderHistory(orders[orders.length - 1]?.created_at)

    return orderEntityArray
  }
}