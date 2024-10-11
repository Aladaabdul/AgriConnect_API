import { Router } from "express";
import { authenticateToken } from "../utils/auth";
import { createOrder, getOrdersForFarmer, getOrdersForUser, updateOrdersStatus } from "../controllers/orderController";


const orderRouter = Router()


// Create new order
orderRouter.post('/create', authenticateToken, createOrder);

// Get all users order
orderRouter.get('/user/orders', authenticateToken, getOrdersForUser);

// Farmers get all orders to their farm
orderRouter.get('/farmer/orders', authenticateToken, getOrdersForFarmer);

// Farmers update order status to their farms
orderRouter.patch('/farmer/:orderId/status', authenticateToken, updateOrdersStatus);


export default orderRouter;