import { Request, Response } from "express";
import { SyncOrdersUseCase } from "../domain/useCases/syncOrders";

export class SyncOrdersController {
  syncOrdersUseCase: SyncOrdersUseCase

  constructor(syncOrdersUseCase: SyncOrdersUseCase) {
    this.syncOrdersUseCase = syncOrdersUseCase
  }

  async handle(req: Request, res: Response) {
    const orders = await this.syncOrdersUseCase.execute()
    return res.json(orders)
  }
}