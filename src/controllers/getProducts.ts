import { Request, Response } from "express";
import { GetProductsUseCase } from "../domain/useCases/getProducts";

export class GetProductsController {
  getProductsUseCase: GetProductsUseCase

  constructor(getProductsUseCase: GetProductsUseCase) {
    this.getProductsUseCase = getProductsUseCase
  }

  async handle(req: Request, res: Response) {
    const { page } = req.query
    const products = await this.getProductsUseCase.execute({ page: Number(page || 1) })
    return res.json(products)
  }
}