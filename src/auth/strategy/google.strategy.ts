import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    private readonly ConfigService: ConfigService,
  ) {
    super({
      clientID: ConfigService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: ConfigService.get<string>('GOOGLE_SECRET'),
      callbackURL: 'http://localhost:3000/auth/google/PetshionOauth',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { displayName, id, photos } = profile;
    const user = {
      googleid: id,
      userName: displayName,
      userImage: photos,
    };
    const savedUserData = await this.UserModel.findOne({
      googleId: user.googleid,
    });
    if (!savedUserData) {
      const userData = await this.UserModel.create({
        googleId: user.googleid,
        username: user.userName,
        image: user.userImage,
      });
      userData.save();
    }
    console.log(savedUserData);
    done(null, savedUserData);
  }
}
