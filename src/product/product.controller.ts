import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
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
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

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

  @Get('/product')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async ShowlistProduct(@Req() req): Promise<ProductListDto[]> {
    return await this.productService.ProductList(req.user.id);
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
