import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            message: "No token available"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "priyanshu")
        req.body = (decoded as any).id
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' })
    }
}  // this is a middleware function that will be called on every request to check if the user
