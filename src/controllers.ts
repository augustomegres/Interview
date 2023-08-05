import { PrismaClient } from "@prisma/client";
import { GetOrdersController } from "./controllers/getOrders";
import { GetProductsController } from "./controllers/getProducts";
import { SyncProductsController } from "./controllers/syncProducts";
import { PrismaProductsRepository } from "./domain/repositories/database/prisma/ProductsRepository";
import { Shopify202204ProductsApi } from "./domain/repositories/storeApi/shopify-2022-04/ProductsApi";
import { GetOrdersUseCase } from "./domain/useCases/getOrders";
import { GetProductsUseCase } from "./domain/useCases/getProducts";
import { SyncProductsUseCase } from "./domain/useCases/syncProducts";
import { SyncOrdersUseCase } from "./domain/useCases/syncOrders";
import { Shopify202204OrdersApi } from "./domain/repositories/storeApi/shopify-2022-04/OrdersApi";
import { PrismaOrdersRepository } from "./domain/repositories/database/prisma/OrdersRepository";
import { SyncOrdersController } from "./controllers/syncOrders";

const storeProductsApi = new Shopify202204ProductsApi()
const storeOrdersApi = new Shopify202204OrdersApi()
const productsRepository = new PrismaProductsRepository(new PrismaClient())
const ordersRepository = new PrismaOrdersRepository(new PrismaClient())

const getProductUseCase = new GetProductsUseCase(productsRepository)
const getProductController = new GetProductsController(getProductUseCase)

const getOrderUseCase = new GetOrdersUseCase(ordersRepository)
const getOrderController = new GetOrdersController(getOrderUseCase)

const syncProductUseCase = new SyncProductsUseCase(storeProductsApi, productsRepository)
const syncProductController = new SyncProductsController(syncProductUseCase)

const syncOrderUseCase = new SyncOrdersUseCase(storeOrdersApi, ordersRepository)
const syncOrderController = new SyncOrdersController(syncOrderUseCase)

export { getOrderController, getProductController, syncProductController, syncOrderController };

