import express from "express"
import SwaggerUI from "swagger-ui-express";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
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


// CDN CSS

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";


// const swaggerDocument = yaml.load(fs.readFileSync("./src/swagger.yaml", 'utf-8'));

const swaggerDocument = yaml.load(
    fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf-8')
);

app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument!, { customCssUrl: CSS_URL }));


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