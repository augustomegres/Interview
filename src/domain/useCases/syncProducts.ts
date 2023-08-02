import { v4 } from 'uuid';
import { IShopProductsApi } from "../../contracts/apis/ShopProductsApi";
import { IProductsRepository } from "../../contracts/database/IProductsRepository";
import { Product } from "../entities/Product";

export class SyncProductsUseCase {
  productsApi: IShopProductsApi
  productsRepository: IProductsRepository
  constructor(productsApi: IShopProductsApi, productsRepository: IProductsRepository) {
    this.productsApi = productsApi
    this.productsRepository = productsRepository
  }

  async execute() {
    const lastFetch = await this.productsRepository.getLastProductDate()

    const products = await this.productsApi.fetchProducts(lastFetch)
    if (!products.length) return []

    const productEntityArray: Product[] = []
    products.map(product => {
      const productEntity = new Product({ id: v4(), name: product.title, platform_id: product.id })
      productEntityArray.push(productEntity)
    })

    await this.productsRepository.createBatchProducts(productEntityArray)

    await this.productsRepository.addFetchProductHistory(products[products.length - 1]?.created_at)

    return productEntityArray
  }
}