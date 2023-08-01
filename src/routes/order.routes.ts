import { Router } from 'express'
import { getOrderController } from '../controllers'

const order = Router()

order.get('/order', async (req, res) => await getOrderController.handle(req, res))

export { order }