import { Request, Response } from 'express';
import UserService from '../services/UserService';

const userService = new UserService();

const login = async (req:Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
  const result = await userService.login(email, password);
  if (result === null || result === 'unauthorized') {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }
  return res.status(200).json({ token: result });
};

const register = () => {};

export { login, register };
