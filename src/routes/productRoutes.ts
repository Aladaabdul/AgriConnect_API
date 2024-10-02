import { Router } from "express";
import { authenticateToken } from "../utils/auth";
import { createProduct, deleteProduct, getAllFarmProduct, updateProduct } from "../controllers/productController";


const productRouter = Router();

productRouter.post('/create', authenticateToken, createProduct);
productRouter.get('/:farmId', getAllFarmProduct);
productRouter.put('/:productId', authenticateToken, updateProduct);
productRouter.delete('/:productId', authenticateToken, deleteProduct);



export default productRouter;