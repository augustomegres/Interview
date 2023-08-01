import { Request, Response } from "express";
import { GetOrdersUseCase } from "../domain/useCases/getOrders";

export class GetOrdersController {
  getOrdersUseCase: GetOrdersUseCase

  constructor(getOrdersUseCase: GetOrdersUseCase) {
    this.getOrdersUseCase = getOrdersUseCase
  }

  async handle(req: Request, res: Response) {
    const orders = await this.getOrdersUseCase.execute()
    return res.json(orders)
  }
}