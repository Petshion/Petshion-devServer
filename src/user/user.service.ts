import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
  async PawmarkList(userId): Promise<any> {
    return await this.UserModel.findOne(
      { _id: userId },
      { _id: 0, pawmark: 1 },
    );
  }
  async addPawmark(userId, PawmarkListDto: PawmarkListDto): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
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
  }
  async deletePawmark(userId, PawmarkListDto: PawmarkListDto): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: userId },
      { $pull: { product_id: new Types.ObjectId(PawmarkListDto.product_id) } },
    );
  }
  async BasketList(userId): Promise<any> {
    return await this.UserModel.findOne({ _id: userId }, { _id: 0, basket: 1 });
  }
  async addBasket(userId, BasketListDto: BasketListDto): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        $addToSet: {
          basket: {
            _id: new Types.ObjectId(),
            product_id: new Types.ObjectId(BasketListDto.product_id),
            title: (
              await this.ProductModel.findOne({ _id: BasketListDto.product_id })
            ).title,
            thumbnail_image: (
              await this.ProductModel.findOne({ _id: BasketListDto.product_id })
            ).thumbnail_image,
            selected_color: BasketListDto.selected_color,
            selected_size: BasketListDto.selected_size,
            selected_count: BasketListDto.selected_count,
          },
        },
      },
    );
  }
  async deleteBasket(
    userId,
    EditBasketListDto: EditBasketListDto,
  ): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: userId },
      { $pull: { basket: { _id: new Types.ObjectId(EditBasketListDto._id) } } },
    );
  }
}
