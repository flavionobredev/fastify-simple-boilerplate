import Logger from '../../utils/logger';
import { CreateUserDTO } from './dto/create-user.dto';

export class UserService {
  public async createOne(data: CreateUserDTO) {
    const user = data;
    Logger.info(`User created: ${user.name} - ${user.email}`);
    return user;
  }
}
