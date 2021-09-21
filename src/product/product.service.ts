import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { FindProductDto } from './dto/FindProduct.dto';
import { ProductListDto } from './dto/ProductList.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { FilteringProductDto } from './dto/FilteringProduct.dto';
import { QueryFilteringProductDto } from './dto/QueryFilteringProduct.dto';
import MongoQS from 'mongo-querystring';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel: Model<ProductDocument>,
  ) {}

  async CreateProduct(
    CreateProductDto: CreateProductDto,
  ): Promise<CreateProductDto> {
    try {
      const createdProduct = await this.ProductModel.create(CreateProductDto);
      return await createdProduct.save();
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      throw await e;
    }
  }
  async FindByProductId(product_id: string): Promise<FindProductDto> {
    try {
      const foundProduct = await this.ProductModel.findById(product_id);
      if (!foundProduct)
        throw new NotFoundException({
          message: '해당 상품이 존재하지 않습니다.',
        });
      return await foundProduct;
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return await e;
    }
  }
  async ProductList(): Promise<ProductListDto[]> {
    try {
      return await this.ProductModel.find({}, { title: 1, thumbnail_image: 1 });
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return await e;
    }
  }
  async FilteringProduct(Query): Promise<FilteringProductDto[]> {
    try {
      var qs = new MongoQS();
      var query = qs.parse(Query);
      console.log(query);
      return await this.ProductModel.find(query, {
        title: 1,
        thumbnail_image: 1,
      });
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return await e;
    }
  }
}
