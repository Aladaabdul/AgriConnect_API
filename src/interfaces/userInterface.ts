import { Document } from "mongoose"
export enum userRole {
    Customer = "Customer",
    Farmer = "Farmer"
}

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    role: userRole,
    address: string,
    contact: string,
    createdAt?: Date
}