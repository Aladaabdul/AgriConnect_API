import express from "express"
import { connectTomongo } from "./config/dbConfig"
import userRouter from "./routes/userRoutes"
const app = express()
const PORT = process.env.PORT || 8000


// connect mongo database
connectTomongo()

app.use(express.json())

// User routes
app.use('/api/user', userRouter);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})