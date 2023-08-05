import { Router } from 'express'
import { getOrderController, syncOrderController } from '../controllers'

const order = Router()

order.get('/orders', async (req, res) => await getOrderController.handle(req, res))
order.get('/orders/sync', async (req, res) => await syncOrderController.handle(req, res))

export { order }