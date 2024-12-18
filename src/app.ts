import express from "express";
import cors from "cors";
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

app.use(cors());


// CDN CSS

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";


// const swaggerDocument = yaml.load(fs.readFileSync("./src/swagger.yaml", 'utf-8'));

const swaggerDocument = yaml.load(
    fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf-8')
);

// app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument!, { customCssUrl: CSS_URL }));


// Route-Handler to visit our docs
app.use(
    '/api-docs',
    SwaggerUI.serve,
    SwaggerUI.setup(swaggerDocument!, {
      customCss:
        '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
      customCssUrl: CSS_URL,
    }),
  );

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