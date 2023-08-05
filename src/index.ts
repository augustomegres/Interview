import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import './controllers'
import { appRoutes } from './routes'
import { errorHandler } from './routes/middlewares/errorHandler'

const port = process.env.PORT

const app = express()

app.use(appRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on ${port}`))