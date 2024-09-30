import { Document } from "mongoose"
export enum userRole {
    Customer = "customer",
    Farmer = "farmer"
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