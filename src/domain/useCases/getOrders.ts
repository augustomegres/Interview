import { IOrderRepository } from "../../contracts/database/IOrdersRepository"

export class GetOrdersUseCase {
  ordersRepository: IOrderRepository
  constructor(ordersRepository: IOrderRepository) {
    this.ordersRepository = ordersRepository
  }
  async execute() {
    const order = await this.ordersRepository.findAll()
    return order
  }
}