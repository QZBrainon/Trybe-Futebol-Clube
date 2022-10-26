import { NextFunction, Request, Response } from 'express';
import HttpExeption from '../utils/HttpException';

const httpErrorHandler = (err:Error, req:Request, res:Response, _next: NextFunction) => {
  const { status, message } = err as HttpExeption;
  res.status(status || 500).json({ message });
};

export default httpErrorHandler;
