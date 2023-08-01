import { Router } from 'express'
import { getProductController } from '../controllers'

const product = Router()

product.get('/product', async (req, res) => await getProductController.handle(req, res))

export { product }