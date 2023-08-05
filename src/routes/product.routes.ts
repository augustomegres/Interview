import { Router } from 'express'
import { getProductController, syncProductController } from '../controllers'

const product = Router()

product.get('/products/sync', async (req, res) => await syncProductController.handle(req, res))
product.get('/products', async (req, res) => await getProductController.handle(req, res))

export { product }