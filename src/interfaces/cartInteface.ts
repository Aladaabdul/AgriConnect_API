import mongoose from "mongoose";


export interface ICart {
    customerId: mongoose.Schema.Types.ObjectId,
    products: {productId: mongoose.Schema.Types.ObjectId, quantity: number} [],
    createdAt: Date,
    updatedAt: Date
}