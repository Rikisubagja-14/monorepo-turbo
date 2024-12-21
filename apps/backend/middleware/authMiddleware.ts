import jwt  from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
     res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    jwt.verify(token as string, secret);
    next(); 
  } catch (error) {
     res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
