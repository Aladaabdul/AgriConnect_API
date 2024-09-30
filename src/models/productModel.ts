import mongoose, {Schema, Document} from "mongoose";
import { IProduct } from "../interfaces/productInterface";
import { timeStamp } from "console";

interface IProductModel extends IProduct, Document {}


const ProductSchema = new Schema<IProductModel>({
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true,
        default: ""
    },

    category: {
        type: String,
        required: true
    },

    createdAt: {type: Date, default: Date.now}
},

{timestamps: true}

)

export default mongoose.model<IProductModel>("Product", ProductSchema);