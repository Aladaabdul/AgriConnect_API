import express from "express"
import { connectTomongo } from "./config/dbConfig"
import userRouter from "./routes/userRoutes"
import farmRouter from "./routes/farmRoutes"
import productRouter from "./routes/productRoutes"
import orderRouter from "./routes/orderRoutes"
const app = express()
const PORT = process.env.PORT || 8000


// connect mongo database
connectTomongo()

app.use(express.json())

// User routes
app.use('/api/user', userRouter);

// Farm routes
app.use('/api/farm', farmRouter);

// Product routes
app.use('/api/product', productRouter);

// Order routes
app.use('/api/order', orderRouter);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})