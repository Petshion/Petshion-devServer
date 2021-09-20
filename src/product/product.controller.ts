import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiParam,
  ApiProperty,
  ApiPropertyOptional,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { QueryFilteringProductDto } from './dto/QueryFilteringProduct.dto';
import { FilteringProductDto } from './dto/FilteringProduct.dto';
import { FindProductDto } from './dto/FindProduct.dto';
import { ShowlistProductDto } from './dto/ShowlistProduct.dto';
import { ProductService } from './product.service';

@Controller()
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/product')
  async CreateProduct(
    @Body() CreateProductDto: CreateProductDto,
  ): Promise<CreateProductDto> {
    return await this.productService.CreateProduct(CreateProductDto);
  }

  @Get('/product/:product_id')
  @ApiParam({
    name: 'product_id',
    required: true,
    description: 'Product ObjectId',
    schema: { type: 'string' },
  })
  async FindProduct(@Param() product_id): Promise<FindProductDto> {
    return await this.productService.FindByProductId(product_id.product_id);
  }

  @Get('/')
  async ShowlistProduct(): Promise<ShowlistProductDto[]> {
    return await this.productService.ShowlistProduct();
  }

  @Get('/search')
  async FilteringProduct(
    @Query() QueryFilteringProductDto: QueryFilteringProductDto,
  ): Promise<FilteringProductDto[]> {
    return await this.productService.FilteringProduct(QueryFilteringProductDto);
  }
}
