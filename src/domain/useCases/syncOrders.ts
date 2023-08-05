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
    const ordersEntityArray: Order[] = []
    const lastFetch = await this.ordersRepository.getLastOrderDate()

    let nextPageToken: string | null = null
    let lastOrderFetchedDate: Date | null = null
    let isFinished = false

    while (true) {
      if (isFinished) break
      const data = await this.ordersApi.fetchOrders({ startDate: lastFetch, nextPageToken });
      nextPageToken = data.nextPageToken
      const orders = data.orders

      if (!orders.length)
        break;

      orders.forEach(order => {
        const orderEntity = new Order({ id: v4(), platform_id: order.id, line_items: order.line_items })
        ordersEntityArray.push(orderEntity);
      });

      if (!data.nextPageToken || data.callLimitExceded) {
        lastOrderFetchedDate = orders[orders.length - 1]?.created_at
        isFinished = true
      }
    }

    const orders = await this.ordersRepository.createBatchOrders(ordersEntityArray);
    if (lastOrderFetchedDate)
      await this.ordersRepository.addFetchOrderHistory(lastOrderFetchedDate);

    return { message: `${orders} orders synced.` }
  }
}
