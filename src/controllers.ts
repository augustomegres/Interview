import { GetOrdersController } from "./controllers/getOrders";
import { GetProductsController } from "./controllers/getProducts";
import { GetOrdersUseCase } from "./domain/useCases/getOrders";
import { GetProductsUseCase } from "./domain/useCases/getProducts";

const getProductUseCase = new GetProductsUseCase()
const getProductController = new GetProductsController(getProductUseCase)

const getOrderUseCase = new GetOrdersUseCase()
const getOrderController = new GetOrdersController(getOrderUseCase)

export { getOrderController, getProductController };

