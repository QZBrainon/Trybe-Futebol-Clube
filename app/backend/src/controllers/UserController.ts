import { Request, Response } from 'express';
import UserService from '../services/UserService';

const userService = new UserService();

const login = async (req:Request, res: Response) => {
  const userCredentials = req.body;
  const result = await userService.login(userCredentials);
  return res.status(200).json({ token: result });
};

const register = () => {};

export { login, register };
