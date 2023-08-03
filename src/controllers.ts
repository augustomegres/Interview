import { PrismaClient } from "@prisma/client";
import { GetOrdersController } from "./controllers/getOrders";
import { GetProductsController } from "./controllers/getProducts";
import { SyncProductsController } from "./controllers/syncProducts";
import { PrismaProductsRepository } from "./domain/repositories/database/prisma/ProductsRepository";
import { Shopify202204ProductsApi } from "./domain/repositories/storeApi/shopify-2022-04/ProductsApi";
import { GetOrdersUseCase } from "./domain/useCases/getOrders";
import { GetProductsUseCase } from "./domain/useCases/getProducts";
import { SyncProductsUseCase } from "./domain/useCases/syncProducts";

const storeApi = new Shopify202204ProductsApi()
const productsRepository = new PrismaProductsRepository(new PrismaClient())

const getProductUseCase = new GetProductsUseCase(productsRepository)
const getProductController = new GetProductsController(getProductUseCase)

const getOrderUseCase = new GetOrdersUseCase()
const getOrderController = new GetOrdersController(getOrderUseCase)

const syncProductUseCase = new SyncProductsUseCase(storeApi, productsRepository)
const syncProductController = new SyncProductsController(syncProductUseCase)

export { getOrderController, getProductController, syncProductController };

