import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { FindProductDto } from './dto/FindProduct.dto';
import { ProductListDto } from './dto/ProductList.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { FilteringProductDto } from './dto/FilteringProduct.dto';
import { QueryFilteringProductDto } from './dto/QueryFilteringProduct.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';
const MongoQs = require('mongo-querystring');
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel: Model<ProductDocument>,
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
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
  async ProductList(UserId): Promise<ProductListDto[]> {
    try {
      let foundProduct = await this.ProductModel.find(
        {},
        { title: 1, thumbnail_image: 1 },
      );
      for (let i = 0; i < foundProduct.length; i++) {
        if (
          (await this.UserModel.findOne({
            $and: [{ _id: UserId }, { pawmark: foundProduct[i]._id }],
          })) !== null
        ) {
          console.log(
            await this.UserModel.findOne({
              $and: [{ _id: UserId }, { pawmark: foundProduct[i]._id }],
            }),
          );
          foundProduct[i].isPawmark = true;
        } else foundProduct[i].isPawmark = false;
      }
      return await foundProduct;
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return await e;
    }
  }
  async FilteringProduct(Query): Promise<FilteringProductDto[]> {
    try {
      var qs = new MongoQs();
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
