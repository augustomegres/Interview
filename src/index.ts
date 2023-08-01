import 'dotenv/config'
import './controllers'
import express from 'express'
import { appRoutes } from './routes'

const port = process.env.PORT

const app = express()

app.use(appRoutes)

app.listen(port, () => console.log(`Listening on ${port}`))