import User from '../models/userModel';
import { Response, Request } from 'express';
import bycrptjs from 'bcryptjs'



// Register a new User function

export const registerUser = async function(req: Request, res: Response) {

    const { name, email, password, role, address, contact, createdAt } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({email});
    } catch (err) {
        return console.log(err)
    }

    if (existingUser) {
        return res.status(400).json({message: "User already exist! Login instead"})
    }

    const hashedpassword = bycrptjs.hashSync(password)

    const user = new User({
        name,
        email,
        password : hashedpassword,
        role,
        address,
        contact,
        createdAt
    });

    try {
        await user.save()
    } catch (err) {
        return console.log(err)
    }
    
    return res.status(201).json({user})

}

// get all user function
export const getAllUser = async function(req: Request, res: Response) {

    let users

    try {
        users = await User.find()
    } catch(err) {
        return console.log(err)
    }

    if (!users) {
        return res.status(404).json({message: "No user found"})
    }

    return res.status(200).json({users});
}

// login user function
export const loginUser = async function(req: Request, res: Response) {
    const {email, password} = req.body

    let existingUser;

    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error)
    }

    if (!existingUser) {
        return res.status(404).json({message: "No user found! Sign up"})
    }

    const isPasswordCorrect = bycrptjs.compareSync(password, existingUser.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({message: "Incorrect password or email"})
    }

    return res.status(200).json({message: "Login successfully"})
}
