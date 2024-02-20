import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/user.dtos';
import { UsersService } from 'src/users/services/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async create(createUserDto: RegisterUserDto) {
    const user = await this.userService.create(createUserDto);
    return { user };
  }
}
