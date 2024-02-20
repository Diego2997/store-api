import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';

import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    const user = this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    try {
      const newUser = this.userRepo.create(data);
      await this.userRepo.save(newUser);
      return newUser;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      this.userRepo.merge(user, changes);
      await this.userRepo.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  errorHandler(error: any) {
    const errorCode = error.code;
    if (error.code === errorCode) {
      throw new BadRequestException(`${error.detail}`);
    }
    throw new InternalServerErrorException('Error, Check server logs');
  }
}
