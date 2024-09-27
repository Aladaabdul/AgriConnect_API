import mongoose from "mongoose"

export interface IFarm {
    farmerId: mongoose.Schema.Types.ObjectId,
    name: string,
    description?: string,
    location: string,
    createdAt: Date
}