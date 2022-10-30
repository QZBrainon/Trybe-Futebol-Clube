import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const secret = process.env.JWT_SECRET;

const jwtAuth = async (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    jwt.verify(token, secret as string);
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default jwtAuth;
