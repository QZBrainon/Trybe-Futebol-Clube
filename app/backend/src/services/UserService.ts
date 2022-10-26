import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Users from '../database/models/UserModel';
import UserCredentials from '../interfaces/UserCredentials';
import HttpExeption from '../utils/HttpException';

dotenv.config();

const secret = process.env.JWT_SECRET;

export default class UserService {
  constructor(private model = Users) {}

  async login({ email, password }:UserCredentials) {
    const user = await this.model.findOne({
      where: { email },
    });
    if (!user) { throw new HttpExeption(404, 'user not registed'); }
    const storedPassword = user.password;
    const { id, username, role } = user;
    const check = await bcryptjs.compare(password, storedPassword);
    if (!check) { throw new HttpExeption(401, 'user not authorized'); }
    const payload = { id, username, role };
    const token = jwt.sign(payload, secret as string);
    return token;
  }
}
