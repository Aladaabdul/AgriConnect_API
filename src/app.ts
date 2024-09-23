import express from "express"
import { connectTomongo } from "./config/dbConfig"
const app = express()
const PORT = process.env.PORT || 8000


// connect mongo database
connectTomongo()

app.use(express.json())





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})