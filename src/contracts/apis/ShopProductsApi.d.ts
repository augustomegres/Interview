export interface IShopProductsApi {
  fetchProducts({ startDate, nextPageToken }: { startDate?: Date | null, nextPageToken?: string | null }): Promise<{ products: any[], nextPageToken: string | null, callLimitExceded: boolean }>
}