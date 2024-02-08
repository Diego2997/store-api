import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BrandsService } from 'src/brands/brands.service';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly brandService: BrandsService,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = this.productRepo.create(createProductDto);
      if (createProductDto.brandId) {
        const brand = await this.brandService.findOne(createProductDto.brandId);
        newProduct.brand = brand;
      }
      if (createProductDto.categoriesIds) {
        // const categories = await this.categoryRepo.find({
        //   where: createProductDto.categoriesIds.map((category) => ({
        //     id: category,
        //   })),
        // });
        // newProduct.categories = categories;
        const categories = await this.categoryRepo.find({
          where: { id: In(createProductDto.categoriesIds) },
        });
        newProduct.categories = categories;
      }
      await this.productRepo.save(newProduct);
      return newProduct;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll() {
    return await this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const productFound = await this.productRepo.findOne({
      where: { id },
      relations: { brand: true, categories: true },
    });
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
      if (updateProductDto.categoriesIds) {
        const categories = await this.categoryRepo.find({
          where: { id: In(updateProductDto.categoriesIds) },
        });
        product.categories = categories;
      }
      this.productRepo.merge(product, updateProductDto);
      await this.productRepo.save(product);
      return product;
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

  async removeCategoryByProduct(productId: number, categoryId: number) {
    try {
      const product = await this.productRepo.findOne({
        where: { id: productId },
        relations: { categories: true },
      });
      product.categories = product.categories.filter((item) => {
        return item.id !== categoryId;
      });
      await this.productRepo.save(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  }
}
