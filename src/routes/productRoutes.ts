import { Router } from "express";
import { authenticateToken } from "../utils/auth";
import { createProduct, getAllFarmProduct } from "../controllers/productController";


const productRouter = Router();

productRouter.post('/create', authenticateToken, createProduct);
productRouter.get('/:id', getAllFarmProduct);



export default productRouter;