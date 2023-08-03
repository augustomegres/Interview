export interface IShopOrdersApi {
  fetchOrders(startDate?: Date | null): Promise<any[]>
}