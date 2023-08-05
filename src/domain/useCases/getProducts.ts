import { IProductsRepository } from "../../contracts/database/IProductsRepository";

export class GetProductsUseCase {
  productRepository: IProductsRepository

  constructor(productRepository: IProductsRepository) {
    this.productRepository = productRepository
  }

  async execute({ page }: { page: number }) {
    const products = await this.productRepository.findAll({ page })
    return { products, page }
  }
}