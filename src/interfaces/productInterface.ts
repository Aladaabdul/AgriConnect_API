import mongoose from "mongoose";

export interface IProduct {
    farmId: mongoose.Schema.Types.ObjectId,
    name: string,
    price: number,
    quantity: number,
    description?: string,
    category: string,
    createdAt: Date
}