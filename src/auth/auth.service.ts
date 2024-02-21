import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/user.dtos';
import { UsersService } from 'src/users/services/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async create(createUserDto: RegisterUserDto) {
    const { password, ...restUser } = createUserDto;
    const user = await this.userService.create({
      ...restUser,
      password: bcrypt.hashSync(password, 10),
    });
    delete user.password;
    return { user };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    delete user.password;
    return { user };
  }
}
