import { Request, Response } from "express";
import { GetProductsUseCase } from "../domain/useCases/getProducts";

export class GetProductsController {
  getProductsUseCase: GetProductsUseCase

  constructor(getProductsUseCase: GetProductsUseCase) {
    this.getProductsUseCase = getProductsUseCase
  }

  async handle(req: Request, res: Response) {
    const products = await this.getProductsUseCase.execute()
    return res.json(products)
  }
}