import { Request, Response } from "express";
import Product from "../models/productModel";
import Farm from "../models/farmModel"
import { IUser } from "../interfaces/userInterface";
import mongoose, {Document} from "mongoose";


interface RequestWithUser extends Request {
    user?: IUser
}

// create Product function
export const createProduct = async function (req: RequestWithUser, res: Response) {

    const { farmId, name, price, quantity, description, category} = req.body

    const userId = req.user?._id

    // Check if farmId is a valid objectId
    if (!mongoose.Types.ObjectId.isValid(farmId)) {
        return res.status(400).json({message: "Invalid farmId"})
    }

    // Check if farm exist and it belongs to authenticated user
    const farm = await Farm.findOne({_id: farmId, farmerId: userId})
    
    if (!farm) {
        return res.status(404).json({message: "Farm not found or doesnt belong to the authenticated user"})
    }

    // Create New Product
    const newProduct = new Product({
        farmId,
        name,
        price,
        quantity,
        description,
        category
    })

    try {
        await newProduct.save()
    } catch (error) {
        return console.log(error)
    }

    return res.status(201).json({message: "Product created successfully", newProduct});

}



// get all farm product
export const getAllFarmProduct = async function (req: RequestWithUser, res: Response) {
    
    const farmId = req.params.farmId;

    let products

    try {
    products = await Product.find({farmId})
    } catch (error) {
        return console.log(error)
    }

    if (!products) {
        return res.status(404).json({message: "No product found"})
    }

    return res.status(201).json({products});
}


// Update product
export const updateProduct = async function (req: RequestWithUser, res: Response) {

    const productId = req.params.productId;

    const { name, price, quantity, description, category } = req.body;

    const userId = req.user!._id

    const product = await Product.findById(productId)

    if (!product) {
        res.status(404).json({message: "No Product Found"})
    }

    // Find the farm the product belongs to
    const farm = await Farm.findById(product?.farmId)

    // Check if the farm belongs to the authenticated user
    if (farm?.farmerId.toString() !== userId!.toString()) {
        return res.status(403).json({message: "You are not authorized to update this product"})
    }

    let updateProduct;

    try {
        updateProduct = await Product.findByIdAndUpdate(productId, {
            name,
            price,
            quantity,
            description,
            category
        })
    } catch (error) {
        return console.log(error)
    }

    return res.status(201).json({message: "Product Updated Successfull", updateProduct})

}


// Delete product
export const deleteProduct = async function(req: RequestWithUser, res: Response) {

    const productId = req.params.productId;

    const userId = req.user?._id

    const product = await Product.findById(productId);

    if (!productId) {
        return res.status(404).json({message: "No product by this id"})
    }

    // Find the farm the product belongs to
    const farm = await Farm.findById(product?.farmId);

    if (farm?.farmerId.toString() !== userId!.toString()) {
        return res.status(403).json({message: "You are not authorized to delete this product"});
    }

    try {
        await Product.findByIdAndDelete(productId)
    } catch (error) {
        return console.log(error)
    }

    return res.status(201).json({message: "Product deleted successfully"})
}