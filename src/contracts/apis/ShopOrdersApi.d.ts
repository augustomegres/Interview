export interface IShopOrdersApi {
  fetchOrders({ startDate, nextPageToken }: { startDate?: Date | null, nextPageToken?: string | null }): Promise<{ orders: any[], nextPageToken: string | null, callLimitExceded: boolean }>
}