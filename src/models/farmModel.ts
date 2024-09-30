import mongoose,{Schema, Document} from "mongoose";
import { IFarm } from "../interfaces/farmInterface";

interface IFarmModel extends IFarm, Document {}

const FarmSchema = new Schema<IFarmModel>({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(farmerId: mongoose.Schema.Types.ObjectId) {
                const user = await mongoose.model('User').findById(farmerId)
                return user && user.role === 'farmer'
            },
            message: "The user assigned must have the role of a Farmer"
        }
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
        default: ""
    },

    location: {
        type: String,
        required: true
    },

    createdAt: { type: Date, default: Date.now }
},

{timestamps: true}

);

export default mongoose.model<IFarmModel>('Farm', FarmSchema);