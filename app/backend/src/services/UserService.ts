import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Users from '../database/models/UserModel';

dotenv.config();

const secret = process.env.JWT_SECRET;

export default class UserService {
  private _decoded: jwt.JwtPayload | string;
  constructor(private _model = Users) {}

  async login(email:string, password:string) {
    const user = await this._model.findOne({
      where: { email },
    });
    if (!user) { return null; }
    const storedPassword = user.password;
    const { id, username, role } = user;
    const check = await bcryptjs.compare(password, storedPassword);
    if (!check) { return 'unauthorized'; }
    const payload = { id, username, role };
    const token = jwt.sign(payload, secret as string);
    return token;
  }

  async getRole(token:string) {
    this._decoded = jwt.verify(token, secret as string) as jwt.JwtPayload;
    const { role } = this._decoded;
    return role;
  }

  get model():Users { return this.model; }
}
