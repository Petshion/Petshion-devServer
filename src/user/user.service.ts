import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import { Model, Mongoose, ObjectId, Types } from 'mongoose';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';
import { BasketListDto, EditBasketListDto } from './dto/BasketList.dto';
import { PawmarkDto } from './dto/Pawmark.dto';
import { User, UserDocument } from './schemas/user.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
    @InjectModel(Product.name)
    private readonly ProductModel: Model<ProductDocument>,
  ) {}
  async PawmarkList(userId): Promise<UserDocument> {
    try {
      return await this.UserModel.findOne(
        { _id: userId },
        { _id: 0, pawmark: 1 },
      );
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return await e;
    }
  }
  async addPawmark(userId, PawmarkDto: PawmarkDto): Promise<HttpStatus> {
    try {
      await this.UserModel.findByIdAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            pawmark: {
              product_id: PawmarkDto.product_id,
              title: (
                await this.ProductModel.findOne({
                  _id: PawmarkDto.product_id,
                })
              ).title,
              thumbnail_image: (
                await this.ProductModel.findOne({
                  _id: PawmarkDto.product_id,
                })
              ).thumbnail_image,
            },
          },
        },
      );
      return await HttpStatus.CREATED;
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return await e;
    }
  }
  async deletePawmark(userId, PawmarkDto: PawmarkDto): Promise<any> {
    try {
      await this.UserModel.findByIdAndUpdate(
        { _id: userId },
        {
          $pull: {
            pawmark: { product_id: PawmarkDto.product_id },
          },
        },
      );
      return await { product_id: PawmarkDto.product_id };
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return await e;
    }
  }
  async BasketList(userId): Promise<UserDocument> {
    try {
      return await this.UserModel.findOne(
        { _id: userId },
        { _id: 0, basket: 1 },
      );
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return await e;
    }
  }
  async addBasket(userId, BasketListDto: BasketListDto): Promise<HttpStatus> {
    try {
      await this.UserModel.findByIdAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            basket: {
              _id: new Types.ObjectId(),
              product_id: new Types.ObjectId(BasketListDto.product_id),
              title: (
                await this.ProductModel.findOne({
                  _id: BasketListDto.product_id,
                })
              ).title,
              thumbnail_image: (
                await this.ProductModel.findOne({
                  _id: BasketListDto.product_id,
                })
              ).thumbnail_image,
              color: BasketListDto.color,
              size: BasketListDto.size,
              count: BasketListDto.count,
            },
          },
        },
      );
      return await HttpStatus.CREATED;
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return await e;
    }
  }
  async deleteBasket(
    userId,
    EditBasketListDto: EditBasketListDto,
  ): Promise<any> {
    try {
      await this.UserModel.findByIdAndUpdate(
        { _id: userId },
        {
          $pull: { basket: { _id: new Types.ObjectId(EditBasketListDto._id) } },
        },
      );
      return await { _id: EditBasketListDto._id };
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return await e;
    }
  }
}
