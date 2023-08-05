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
    const productEntityArray: Product[] = []
    const lastFetch = await this.productsRepository.getLastProductDate();

    let nextPageToken: string | null = null
    let lastProductFetchedDate: Date | null = null
    let isFinished = false
    while (true) {
      if (isFinished) break
      const data = await this.productsApi.fetchProducts({ startDate: lastFetch, nextPageToken });
      nextPageToken = data.nextPageToken
      const products = data.products

      if (!products.length)
        break;

      products.forEach(product => {
        const productEntity = new Product({ id: v4(), name: product.title, platform_id: product.id });
        productEntityArray.push(productEntity);
      });

      if (!data.nextPageToken || data.callLimitExceded) {
        lastProductFetchedDate = products[products.length - 1]?.created_at
        isFinished = true
      }
    }

    const products = await this.productsRepository.createBatchProducts(productEntityArray);
    if (lastProductFetchedDate)
      await this.productsRepository.addFetchProductHistory(lastProductFetchedDate);

    return { message: `${products} products synced.` }
  }
}