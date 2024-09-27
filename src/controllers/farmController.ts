import { Response, Request } from "express";
import Farm from "../models/farmModel";
import User from "../models/userModel";
import { IUser } from "../interfaces/userInterface";


interface RequestWithUser extends Request {
    user?: IUser
  }


// Create a New Farm
export const createFarm = async function(req: RequestWithUser, res: Response) {

    const { name, description, location} = req.body;

    const userId = req.user?._id;

    const user = await User.findById(userId)

    console.log(user?.role)

    if (!user || user.role !== 'Farmer') {
        return res.status(400).json({message: "Only users with Farmer role can create farms."})
    }

    const newFarm = new Farm({
        farmerId: userId,
        name,
        description,
        location
    })

    try {
        await newFarm.save()
    } catch (error) {
        return console.log(error)
    }

    return res.status(201).json({message: "Farm created Successfully", Farm: newFarm})
}


// get All Farm
export const getAllFarm = async function (req: Request, res: Response) {
    
    let farms

    try {
        farms = await Farm.find()
    } catch (error) {
        return console.log(error)
    }

    if (!farms) {
        return res.status(404).json({message: "No Farm Found"});
    }

    return res.status(200).json({farms})
}