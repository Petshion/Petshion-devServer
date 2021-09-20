import {
  Controller,
  Get,
  Query,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Console } from 'console';
import { AuthService } from 'src/auth/auth.service';
import { GoogleAuthGuard } from 'src/auth/guard/google-auth.guard';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('auth/google')
  @UseGuards(GoogleAuthGuard)
  async googleauth(@Request() req) {}

  @Get('auth/google/PetshionOauth')
  @UseGuards(GoogleAuthGuard)
  @Redirect('OAuthLogin://login?user=')
  async googleauthRedirect(@Request() req) {
    console.log(JSON.stringify(req.user));
    return {
      url: 'OAuthLogin://login?user=' + JSON.stringify(req.user),
    };
  }
}
