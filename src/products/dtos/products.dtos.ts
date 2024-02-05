import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  images: string[];

  @IsNotEmpty()
  @IsPositive()
  brandId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
