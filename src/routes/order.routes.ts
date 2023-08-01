import { Router } from 'express'

const order = Router()

order.get('/order', (req, res) => res.json({ order: [] }))

export { order }