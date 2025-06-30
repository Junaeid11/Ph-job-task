import express, { Application } from 'express'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
import cookieParser from 'cookie-parser'
import cors from 'cors'; 

const app: Application = express()
app.use(cors({origin: 'http://localhost:3000', credentials: true} ))

app.use(express.json())
app.use(cookieParser())

// Welcome page
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Event Management API',
    status: 'Server is running successfully! 🚀',
    version: '1.0.0',
    developer: 'Junaeid Ahmed Tanim',
    contact: 'junaeidahmed979@gmail.com',
    portfolio: 'https://noobwork.me',
    github: 'https://github.com/Junaeid11',
 
  });
});
app.use('/api/',router )
app.use(notFound)
app.use(globalErrorHandler)

export default app

