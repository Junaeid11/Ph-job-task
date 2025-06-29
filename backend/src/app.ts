import express, { Application,  } from 'express'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
import cookieParser from 'cookie-parser'
import cors from 'cors'; 

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/',router )
app.use(notFound)
app.use(globalErrorHandler)

export default app

