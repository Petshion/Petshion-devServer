import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { BasketListDto } from './dto/BasketList.dto';
import { User, UserDocument } from './schemas/user.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}
  async PawmarkList(user): Promise<any> {
    return await this.UserModel.findOne(
      { _id: user.id },
      { title: 1, thumbnail_image: 1 },
    )
      .populate('pawmark')
      .exec();
  }
  async addPawmark(user, productId): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: user.id },
      { $addToSet: { pawmark: [new Types.ObjectId(productId)] } },
    );
  }
  async deletePawmark(user, productId): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: user.id },
      { $pullAll: { pawmark: [new Types.ObjectId(productId)] } },
    );
  }
  async BasketList(user): Promise<any> {
    return await this.UserModel.findOne({ _id: user.id }, { basket: 1 })
      .populate({
        path: 'basket',
        populate: { path: 'product_id', select: 'title thumbnail_image' },
      })
      .exec();
  }
  async addBasket(user, BasketListDto: BasketListDto): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: user.id },
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
  async deleteBasket(user, ProductId): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: user.id },
      { $pull: { basket: { _id: new Types.ObjectId(ProductId) } } },
    );
  }
}
