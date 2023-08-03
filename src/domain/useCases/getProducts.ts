import { IProductsRepository } from "../../contracts/database/IProductsRepository";

export class GetProductsUseCase {
  productRepository: IProductsRepository

  constructor(productRepository: IProductsRepository) {
    this.productRepository = productRepository
  }
  
  async execute() {
    const products = await this.productRepository.findAll()
    return products
  }
}