import { HttpException } from 'src/utils/http-errors';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

export class UserController {
  constructor(private readonly userService: UserService) {}
  public async createOne(data: CreateUserDTO) {
    if (!data.email) throw new HttpException('email is required', 400);
    const user = await this.userService.createOne(data);
    return {
      statusCode: 201,
      body: user,
    };
  }
}
