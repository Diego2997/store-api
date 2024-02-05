import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly brandService: BrandsService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = this.productRepo.create(createProductDto);
      if (createProductDto.brandId) {
        const brand = await this.brandService.findOne(createProductDto.brandId);
        newProduct.brand = brand;
      }
      await this.productRepo.save(newProduct);
      return newProduct;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll() {
    return await this.productRepo.find();
  }

  async findOne(id: number) {
    const productFound = await this.productRepo.findOneBy({ id });
    if (!productFound) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return productFound;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findOne(id);
      if (updateProductDto.brandId) {
        const brand = await this.brandService.findOne(updateProductDto.brandId);
        product.brand = brand;
      }
      this.productRepo.merge(product, updateProductDto);
      await this.productRepo.save(product);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
  private handleErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(`Error, check server logs`);
  }
}
