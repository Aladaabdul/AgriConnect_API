import { Request, Response } from "express";
import Order from "../models/orderModel";
import Product from "../models/productModel";
import Farm from "../models/farmModel";
import { IUser } from "../interfaces/userInterface";


interface RequestWithUser extends Request {
    user?: IUser
}

// Create order function
export const createOrder = async function (req: RequestWithUser, res: Response) {
    
    const { farmId, products } = req.body;

    const userId = req.user?._id;

    // Loop through each products in the order
    for (const item of products) {

        const product = await Product.findById(item.productId)

        if (!product) {
            return res.status(404).json({message: "Product not found"})
        }

        // Check if enough stock is available
        if (product.quantity < item.quantity) {
            return res.status(400).json({message: `No enough quantity for ${product.name}`})
        }

        product.quantity -= item.quantity
        await product.save();
    }

    // Calculate total amount

    let trackAmount = 0;

    for (const item of products) {
        
        const product = await Product.findById(item.productId);

        // Calculate the total amount
        trackAmount = product!.price * item.quantity
    }

    // create new order
    const newOrder = new Order({
        customerId: userId,
        farmId,
        products,
        totalAmount: trackAmount
    })

    try {
        await newOrder.save()
    } catch (error) {
        return console.log(error)
    }

    return res.status(201).json({message: "Order created successfully", newOrder})
}

// Users get their orders function
export const getOrdersForUser = async function (req: RequestWithUser, res: Response) {

    const userId = req.user?._id;

    const orders = await Order.find({customerId: userId});

    if (!orders || orders.length === 0) {
        return res.status(404).json({message: "This user has No Order"});
    }

    return res.status(201).json({orders});
}

// Farmer get all orders to their farms
export const getOrdersForFarmer = async function (req: RequestWithUser, res: Response) {

    const farmerId = req.user?._id;

    if (!farmerId) {
        return res.status(404).json({message: "User not authenticated"});
    }

    const farms = await Farm.find({farmerId});

    if (!farms || farms.length === 0) {
        return res.status(404).json({message: "No farm found for this Farmer"})
    }

    // Extract all farmer farm Id
    const farmIds = farms.map(farm => farm._id);

    console.log(`FarmerId: ${farmerId}`, `farmId: ${farmIds}`);

    // Fetch all products belonging to the farmers farm
    const products = await Product.find({farmId: {$in: farmIds}})

    // Extract all productIds from farm products
    const productIds = products.map(product => product._id);

    // Get all orders for the farmer
    const orders = await Order.find({"products.productId": {$in: productIds}})
    

    if (!orders || orders.length === 0) {
        return res.status(404).json({message: "No Orders for this Farm"})
    }

    return res.status(201).json({orders});
}


// Farmers update status of orders to their farms
export const updateOrdersStatus = async function (req: RequestWithUser, res: Response) {

    const orderId = req.params.orderId;

    const farmerId = req.user?._id;

    const  { status } = req.body;

    const allowedStatus = ["Pending", "Confirmed", "Delivered", "Canceled"]

    if (!allowedStatus.includes(status)) {
        return res.status(400).json({message: "Invalid status provided"})
    }

    if (!farmerId) {
        return res.status(400).json({message: "User not authenticated"})
    }

    const farms = await Farm.find({farmerId});
    
    if (!farms || farms.length === 0) {
        return res.status(404).json({message: "No farm found for this farmer"})
    }

    // Extract all farmer farm Ids
    const farmIds = farms.map(farm => farm._id);

    // find order by Id and farmId of the farmer
    const order = await Order.findOne({_id: orderId, farmId: {$in: farmIds}})

    if (!order) {
        return res.status(404).json({message: "No order for this farm"})
    }


    if (status === 'Canceled') {
        return res.status(400).json({message: "Order is already canceled and cannot be updated"})
    }

    // Update the order based on the req body
    order.status = status;
    await order.save();

    if (status === 'Canceled') {

        for (const productItem of order.products) {
            const product = await Product.findById(productItem.productId);

            if (product) {
                product.quantity += productItem.quantity
                await product.save();
            }
        }
    }

    return res.status(200).json({ message: `Order status updated to ${status}`, order });

}


