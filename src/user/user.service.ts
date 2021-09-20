import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}
  async pawmark(user): Promise<any> {
    const pawmark = this.UserModel.findOne({ _id: user.id })
      .populate('pawmark')
      .exec();
  }
}
