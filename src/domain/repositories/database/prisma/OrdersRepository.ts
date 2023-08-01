import { PrismaClient } from "@prisma/client";
import { IOrderRepository } from "../../../../contracts/database/IOrdersRepository";

export class PrismaOrderRepository implements IOrderRepository {
  database: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.database = prismaClient
  }
}