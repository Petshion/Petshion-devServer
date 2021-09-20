import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async createToken(user: any): Promise<any> {
    const payload = { id: user._id };
    console.log(payload);
    return await {
      access_token: this.jwtService.sign(payload),
    };
  }
}
