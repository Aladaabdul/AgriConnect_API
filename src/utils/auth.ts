import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express"
import User from "../models/userModel";
import dotenv from "dotenv"

dotenv.config();

const secretKey = process.env.TOKEN_KEY as string


interface RequestWithUser extends Request {
    user?: string | JwtPayload;
  }

// Middleware to authenticate user using JWT
export async function authenticateToken(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // Unauthorized


    try {
        const decoded: any = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.userId);
        
        if (!user) return res.sendStatus(403); // Forbidden
        
        req.user = user; // Attach the user object to the request
        next();
      } catch (err) {
        return res.sendStatus(403); // Invalid token
      }
};

    // jwt.verify(token, secretKey, (err, user) => {
    //     if (err) return res.sendStatus(403); // Forbidden
    //     req.user = user as JwtPayload;
    //     next();
    // });
// }