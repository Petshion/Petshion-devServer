import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    private readonly ConfigService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: ConfigService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: ConfigService.get<string>('GOOGLE_SECRET'),
      callbackURL:
        'https://petshion-dev.herokuapp.com/auth/google/PetshionOauth',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { displayName, id, _json } = profile;
    const user = {
      googleid: id,
      userName: displayName,
      userImage: _json.picture,
    };
    const savedUserData = await this.UserModel.findOne({
      googleId: user.googleid,
    });
    if (!(await this.UserModel.findOne({ googleId: user.googleid }))) {
      const userData = await this.UserModel.create({
        googleId: user.googleid,
        username: user.userName,
        image: user.userImage,
      });
      await userData.save();
    }

    const Token = await this.authService.createToken(savedUserData);
    const UserData = {
      username: savedUserData.username,
      image: savedUserData.image,
      token: Token,
    };
    console.log(JSON.stringify(UserData));
    done(null, UserData);
  }
}
