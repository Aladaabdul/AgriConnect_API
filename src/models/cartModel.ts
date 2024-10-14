import mongoose, { Document, Schema } from "mongoose";
import { ICart } from "../interfaces/cartInteface";

interface ICartModel extends ICart, Document {}

const CartSchema = new Schema<ICartModel> ({

    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},

    products: [{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
        quantity: {type: Number, required: true, min: 1}
    }],

    createdAt: {type: Date, default: Date.now},

    updatedAt: {type: Date, default: Date.now}
},

{timestamps: true}

)

export default mongoose.model<ICartModel>('Cart', CartSchema);