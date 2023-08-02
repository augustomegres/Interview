export interface IShopProductsApi {
  fetchProducts(startDate?: Date | null): Promise<any[]>
}