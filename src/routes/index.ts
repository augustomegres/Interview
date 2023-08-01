import { Router } from "express"
import { order } from "./order.routes"
import { product } from "./product.routes"

const appRoutes = Router()

appRoutes.use(order)
appRoutes.use(product)

export { appRoutes }