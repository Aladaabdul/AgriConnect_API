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

// Update Farm
export const updateFarm = async function (req: RequestWithUser, res: Response) {

    const farmId = req.params.id;

    const { name, description, location } = req.body;

    const userId = req.user!._id;

    const farm = await Farm.findById(farmId)


    if (!farm) {
        res.status(404).json({message: "No Farm Found"})
    }

    if (farm?.farmerId.toString() !== userId!.toString()) {
        return res.status(403).json({message: "You are not authorized to update this farm"})
    }
    let updatedfarm
    try {
        
        updatedfarm = await Farm.findByIdAndUpdate(farmId, {
            name,
            description,
            location
        })
        
    } catch (error) {
      return console.log(error)  
    }

    return res.status(200).json({message: "Farm Updated Successfully"})
    
}

// Delete Farm
export const deleteFarm = async function (req: RequestWithUser, res: Response) {

    const farmId = req.params.id;

    const userId = req.user!._id;

    const farm = await Farm.findById(farmId)


    if (!farm) {
        res.status(404).json({message: "No Farm Found"})
    }

    if (farm?.farmerId.toString() !== userId!.toString()) {
        return res.status(403).json({message: "You are not authorized to delete this farm"})
    }

    try {
        await Farm.findByIdAndDelete(farmId)
    } catch(err) {
        return console.log(err)
    }

    return res.status(200).json({message: "Farm deleted Successfully"})

}

// get All farmer Farm

export const getFarmsByUser = async function (req: RequestWithUser, res: Response) {
     
    const userId = req.user?._id

    if (!userId) {
        return res.status(401).json({message: "User not Authenticated"})
    }

    let farms
    try {
        farms = await Farm.find({farmerId: userId})
    } catch (error) {
        return console.log(error)
    }

    if (!farms || farms.length === 0) {
        return res.status(404).json({message: "No farm found this user"})
    }

    return res.status(200).json({farms});
}