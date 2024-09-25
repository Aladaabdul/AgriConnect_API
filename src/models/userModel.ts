import mongoose, { Schema, Document } from "mongoose";
import { userRole, IUser } from "../interfaces/userInterface";

interface IUserModel extends IUser, Document {}

const UserSchema = new Schema<IUserModel>({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: Object.values(userRole),
        default: userRole.Customer
    },

    address: {
        type: String
    },

    contact: {
        type: String
    },

    createdAt: { type: Date, default: Date.now}

}, 

{timestamps: true}

)

export default mongoose.model<IUserModel>('User', UserSchema)