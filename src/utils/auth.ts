import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config();

const secretKey = process.env.TOKEN_KEY as string

//|| "d61eb919d47f29cd67e9550d7562e9c228042de37e3267de1dc8315e01d25960"

interface RequestWithUser extends Request {
    user?: string | JwtPayload;
  }

// Middleware to authenticate user using JWT
export function authenticateToken(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user as JwtPayload;
        next();
    });
}