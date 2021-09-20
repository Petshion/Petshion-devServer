import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import { Model, Mongoose, Types } from 'mongoose';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';
import { BasketListDto, EditBasketListDto } from './dto/BasketList.dto';
import { PawmarkListDto } from './dto/Pawmark.dto';
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
  async addPawmark(
    userId,
    PawmarkListDto: PawmarkListDto,
  ): Promise<HttpStatus> {
    try {
      await this.UserModel.findByIdAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            pawmark: {
              product_id: PawmarkListDto.product_id,
              title: (
                await this.ProductModel.findOne({
                  _id: PawmarkListDto.product_id,
                })
              ).title,
              thumbnail_image: (
                await this.ProductModel.findOne({
                  _id: PawmarkListDto.product_id,
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
  async deletePawmark(
    userId,
    PawmarkListDto: PawmarkListDto,
  ): Promise<HttpStatus> {
    try {
      await this.UserModel.findByIdAndUpdate(
        { _id: userId },
        {
          $pullAll: {
            pawmark: [new Types.ObjectId(PawmarkListDto.product_id)],
          },
        },
      );
      return await HttpStatus.OK;
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
              selected_color: BasketListDto.selected_color,
              selected_size: BasketListDto.selected_size,
              selected_count: BasketListDto.selected_count,
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
  ): Promise<HttpStatus> {
    try {
      await this.UserModel.findByIdAndUpdate(
        { _id: userId },
        {
          $pull: { basket: { _id: new Types.ObjectId(EditBasketListDto._id) } },
        },
      );
      return await HttpStatus.OK;
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return await e;
    }
  }
}
