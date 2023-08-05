import { IOrderRepository } from "../../contracts/database/IOrdersRepository"

export class GetOrdersUseCase {
  ordersRepository: IOrderRepository
  constructor(ordersRepository: IOrderRepository) {
    this.ordersRepository = ordersRepository
  }
  async execute({ page }: { page: number }) {
    const orders = await this.ordersRepository.findAll({ page })
    return { orders, page }
  }
}