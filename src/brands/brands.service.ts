import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
  ) {}
  findAll() {
    return this.brandRepo.find();
  }
  async findOne(id: number) {
    const product = await this.brandRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }
  async create(data: CreateBrandDto) {
    try {
      const newBrand = this.brandRepo.create(data);
      await this.brandRepo.save(newBrand);
      return newBrand;
    } catch (error) {
      this.handleErrors(error);
    }
  }
  async update(id: number, changes: UpdateBrandDto) {
    try {
      const brand = await this.findOne(id);
      this.brandRepo.merge(brand, changes);
      await this.brandRepo.save(brand);
    } catch (error) {
      this.handleErrors(error);
    }
  }
  async remove(id: number) {
    const brand = await this.findOne(id);
    await this.brandRepo.remove(brand);
  }

  private handleErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(`Error, check server logs`);
  }
}
