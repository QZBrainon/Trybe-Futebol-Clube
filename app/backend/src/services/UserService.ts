import Users from '../database/models/UserModel';

export default class UserService {
  constructor(private model = Users) {}
}
