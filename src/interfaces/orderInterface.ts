import mongoose from "mongoose";

export interface IOrder {
    customerId: mongoose.Schema.Types.ObjectId,
    farmId : mongoose.Schema.Types.ObjectId,
    products: {productId: mongoose.Schema.Types.ObjectId, quantity: number} [],
    totalAmount: number,
    status: 'Pending' | 'Confirmed' | 'Delivered' | 'Canceled',
    createdAt: Date,
    updatedAt: Date
}