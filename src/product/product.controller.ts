import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiParam,
  ApiProperty,
  ApiPropertyOptional,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { QueryFilteringProductDto } from './dto/QueryFilteringProduct.dto';
import { FilteringProductDto } from './dto/FilteringProduct.dto';
import { FindProductDto } from './dto/FindProduct.dto';
import { ProductListDto } from './dto/ProductList.dto';
import { ProductService } from './product.service';
import { request } from 'express';

@Controller()
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/product')
  async CreateProduct(
    @Body() CreateProductDto: CreateProductDto,
  ): Promise<CreateProductDto> {
    CreateProductDto.size_content = [
      ['1', '2', '3', '4', '5'],
      ['A', 'B', 'C', 'D', 'E'],
      ['1', '2', '3', '4', '5'],
    ];
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

  @Get('/product')
  async ShowlistProduct(): Promise<ProductListDto[]> {
    return await this.productService.ProductList();
  }

  @Get('/search')
  async FilteringProduct(
    @Query() QueryFilteringProductDto: QueryFilteringProductDto,
  ): Promise<FilteringProductDto[]> {
    console.log(request.query);
    return await this.productService.FilteringProduct(request.query);
  }
}
