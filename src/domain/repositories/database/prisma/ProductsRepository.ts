import { PrismaClient } from "@prisma/client";
import { IProductsRepository } from "../../../../contracts/database/IProductsRepository";
import { Product } from "../../../entities/Product";

export class PrismaProductsRepository implements IProductsRepository {
  database: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.database = prismaClient
  }
  async findAll(): Promise<Product[]> {
    const productList = await this.database.product.findMany()
    const productArray: Product[] = []
    for (const product of productList) {
      productArray.push(new Product(product))
    }
    return productArray
  }

  async getLastProductDate(): Promise<Date | null> {
    const latestProduct = await this.database.productFetchHistory.findFirst({
      orderBy: { lastProductDate: "desc" },
    });

    return latestProduct ? latestProduct.lastProductDate : null;
  }
  async addFetchProductHistory(date: Date): Promise<void> {
    await this.database.productFetchHistory.create({ data: { lastProductDate: date } })
  }

  async createBatchProducts(product: Product[]): Promise<void> {
    await this.database.product.createMany({ data: product })
  }
}