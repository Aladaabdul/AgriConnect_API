import { Request, Response } from "express";
import Product from "../models/productModel";
import Farm from "../models/farmModel"
import { IUser } from "../interfaces/userInterface";
import mongoose from "mongoose";


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
    
    const farmId = req.params.id;

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