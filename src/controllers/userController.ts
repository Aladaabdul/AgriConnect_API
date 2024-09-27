import User from '../models/userModel';
import { validateUserData, validateLoginData } from '../utils/validations'
import { Response, Request } from 'express';
import bycrptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { string } from 'joi';

dotenv.config();

const secretKey = process.env.TOKEN_KEY as string


// Register a new User function
export const registerUser = async function(req: Request, res: Response) {

    const valid = validateUserData(req.body)

    if (valid.error) {
        return res.status(400).json({message: valid.error})
    }

    const { name, email, password, role, address, contact, createdAt } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({email});
    } catch (err) {
        return console.log(err)
    }

    if (existingUser) {
        return res.status(400).json({message: `${email} already exist! Login instead`})
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
    
    const token = jwt.sign({ userId: user!.id, email: user!.email }, secretKey , { expiresIn: '1h' });

    return res.status(201).json({user, token})

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

    const valid = validateLoginData(req.body)

    if (valid.error) {
        return res.status(400).json({message: `Invalid Login credentials ${valid.error}`})
    }

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

    const token = jwt.sign({ userId: existingUser!.id, email: existingUser!.email }, secretKey , { expiresIn: '1h' });

    return res.status(200).json({message: "Login successfully", token})
}


// delete user function
export const deleteUser = async function(req: Request, res: Response) {
    const userId = req.params.id;

    let user;
    try {
        user = await User.findByIdAndDelete(userId);
    } catch (error) {
        return console.log(error)
    }

    if (!user) {
        return res.status(500).json({message: "Unable to delete user"})
    }

    return res.status(200).json({message: `${user.email} deleted successfully`})
}


//update user function
export const updateUser = async function(req: Request, res: Response) {
    const userId = req.params.id;
    const { name, role, address, contact } = req.body

    let user;

    try {
       user = await User.findByIdAndUpdate(userId, {
        name,
        role,
        address,
        contact
       }) 
    } catch (err) {
        return console.log(err)
    }

    if (!user) {
        return res.status(500).json({message: "Unable to update user"})
    }

    return res.status(200).json({user})
}