import { Request, Response } from "express";
import { GetOrdersUseCase } from "../domain/useCases/getOrders";

export class GetOrdersController {
  getOrdersUseCase: GetOrdersUseCase

  constructor(getOrdersUseCase: GetOrdersUseCase) {
    this.getOrdersUseCase = getOrdersUseCase
  }

  async handle(req: Request, res: Response) {
    const { page } = req.query
    const orders = await this.getOrdersUseCase.execute({ page: Number(page || 1) })
    return res.json(orders)
  }
}