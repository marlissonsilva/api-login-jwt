import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDatabase from "./src/db/conect.js";
import userRouter from './src/routes/userRouter.js'
import adminRouter from './src/routes/adminRouter.js'
const app = express()


app.use(cors())

connectDatabase()

app.use('/user', express.json(), userRouter)

app.use('/admin', express.json(), adminRouter)

app.listen(process.env.PORT, () => { console.log(`Server Running in http://localhost:${process.env.PORT}`) })

