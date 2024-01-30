import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  findAll() {
    return this.categoryRepo.find();
  }
  async findOne(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }
  async create(data: CreateCategoryDto) {
    try {
      const newCategory = this.categoryRepo.create(data);
      await this.categoryRepo.save(newCategory);
      return newCategory;
    } catch (error) {
      this.handleErrors(error);
    }
  }
  async update(id: number, changes: UpdateCategoryDto) {
    try {
      const category = await this.findOne(id);
      this.categoryRepo.merge(category, changes);
      await this.categoryRepo.save(category);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await this.categoryRepo.remove(category);
    return true;
  }

  private handleErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(`Error, check server logs`);
  }
}
