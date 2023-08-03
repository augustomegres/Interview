import { Router } from 'express'
import { getOrderController, syncOrderController } from '../controllers'

const order = Router()

order.get('/order', async (req, res) => await getOrderController.handle(req, res))
order.get('/order/sync', async (req, res) => await syncOrderController.handle(req, res))

export { order }