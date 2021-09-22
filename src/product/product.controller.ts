import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
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
import { Request } from 'express';

@Controller()
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/product')
  async CreateProduct(
    @Body() CreateProductDto: CreateProductDto,
  ): Promise<CreateProductDto> {
    CreateProductDto.size_content = [
      ['22', '24', '26', '30', '34'],
      ['32', '36', '41', '47', '53'],
      ['19', '24', '27', '31', '35'],
    ];
    CreateProductDto.size = ['S', 'M', 'L', 'XL', '2XL'];
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
    @Req() req: Request,
  ): Promise<FilteringProductDto[]> {
    console.log(req.query);
    return await this.productService.FilteringProduct(req.query);
  }
}
