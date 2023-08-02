import { Router } from 'express'
import { getProductController, syncProductController } from '../controllers'

const product = Router()

product.get('/product/sync', async (req, res) => await syncProductController.handle(req, res))
product.get('/product', async (req, res) => await getProductController.handle(req, res))

export { product }