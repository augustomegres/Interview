import { PrismaClient } from "@prisma/client";
import { IProductsRepository } from "../../../../contracts/database/IProductsRepository";

export class PrismaProductsRepository implements IProductsRepository {
  database: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.database = prismaClient
  }
}