import { Request, Response } from "express";
import { SyncProductsUseCase } from "../domain/useCases/syncProducts";

export class SyncProductsController {
  syncProductsUseCase: SyncProductsUseCase

  constructor(syncProductsUseCase: SyncProductsUseCase) {
    this.syncProductsUseCase = syncProductsUseCase
  }

  async handle(req: Request, res: Response) {
    const products = await this.syncProductsUseCase.execute()
    return res.json(products)
  }
}