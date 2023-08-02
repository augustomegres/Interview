import { Product } from "../../domain/entities/Product"

export interface IProductsRepository {
  addFetchProductHistory(date: Date): Promise<void>
  getLastProductDate(): Promise<Date | null>
  createBatchProducts(product: Product[]): Promise<void>
}