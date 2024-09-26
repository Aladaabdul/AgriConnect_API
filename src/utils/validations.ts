import Joi from "joi"
import { IUser } from "../interfaces/userInterface"



export const validateUserData = (user: IUser) => {

    const userSchema = Joi.object<IUser>({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(36).required(),
        role: Joi.string().valid('customer', 'farmer').default('customer'),
        address: Joi.string().optional(),
        contact: Joi.string().optional(),
        createdAt: Joi.date().optional()
    });

    return userSchema.validate(user)
}

export const validateLoginData = (login: {email: string, password: string}) => {

    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return loginSchema.validate(login)
}