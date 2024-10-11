import mongoose, { Schema, Document } from "mongoose";
import { IOrder } from "../interfaces/orderInterface";

interface IOrderModel extends IOrder, Document {}


const OrderSchema = new Schema<IOrderModel> ({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},

    farmId: {type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true},

    products: [{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
        quantity: {type: Number, required: true, min: 1}
    }],

    totalAmount: {type: Number, required: true},

    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Delivered', 'Canceled'],
        default: 'Pending'
    },

    createdAt: {type: Date, default: Date.now},

    updatedAt: {type: Date, default: Date.now}
},

{timestamps: true}

)

export default mongoose.model<IOrderModel>('Order', OrderSchema);

