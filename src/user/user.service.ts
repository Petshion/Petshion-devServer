import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';
import { BasketListDto } from './dto/BasketList.dto';
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
    return await this.UserModel.find({ _id: userId }, { pawmark: 1, _id: 0 })
      .populate('pawmark', 'title thumbnail_image')
      .exec();
  }
  async addPawmark(userId, productId): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { pawmark: new Types.ObjectId(productId) } },
    );
  }
  async deletePawmark(userId, productId): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: userId },
      { $pullAll: { pawmark: new Types.ObjectId(productId) } },
    );
  }
  async BasketList(userId): Promise<any> {
    return await this.UserModel.findOne({ _id: userId }, { basket: 1, _id: 0 })
      .populate({
        path: 'basket',
        populate: { path: 'product_id', select: 'title thumbnail_image' },
      })
      .exec();
  }
  async addBasket(userId, BasketListDto: BasketListDto): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        $addToSet: {
          basket: {
            _id: new Types.ObjectId(),
            product_id: new Types.ObjectId(BasketListDto.product_id),
            selected_color: BasketListDto.selected_color,
            selected_size: BasketListDto.selected_size,
            selected_count: BasketListDto.selected_count,
          },
        },
      },
    );
  }
  async deleteBasket(userId, ProductId): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: userId },
      { $pull: { basket: { _id: new Types.ObjectId(ProductId) } } },
    );
  }
}
