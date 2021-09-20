import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Console } from 'console';
import { AuthService } from 'src/auth/auth.service';
import { GoogleAuthGuard } from 'src/auth/guard/google-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { BasketListDto, EditBasketListDto } from './dto/BasketList.dto';
import { PawmarkDto } from './dto/Pawmark.dto';
import { UserService } from './user.service';

@Controller()
@ApiTags('User')
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
    return {
      url: 'OAuthLogin://login?user=' + JSON.stringify(req.user),
    };
  }
  @Get('pawmark')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '모든 발바닥마크 요청',
    description: '받은 엑세스토큰의 id에 저장되어있는 pawmark를 모두 조회한다.',
  })
  async PawmarkList(@Request() req): Promise<any> {
    console.log(req.user.id);
    return await this.userService.PawmarkList(req.user.id);
  }
  @Post('pawmark')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '발바닥마크 추가',
    description: '받은 엑세스토큰의 id에 해당 상품의 oid를 pawmark에 추가한다.',
  })
  async addPawmark(
    @Request() req,
    @Body() PawmarkListDto: PawmarkDto,
  ): Promise<any> {
    return await this.userService.addPawmark(req.user.id, PawmarkListDto);
  }
  @Delete('pawmark')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '발바닥마크 삭제',
    description:
      '받은 엑세스토큰의 id에 해당 상품의 oid를 pawmark에서 삭제한다.',
  })
  async deletePawmark(
    @Request() req,
    @Body() PawmarkListDto: PawmarkDto,
  ): Promise<any> {
    return await this.userService.deletePawmark(req.user.id, PawmarkListDto);
  }
  @Get('basket')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '모든 장바구니 요청',
    description: '받은 엑세스토큰의 id에 저장되어있는 basket을 모두 조회한다.',
  })
  async BasketList(@Request() req): Promise<any> {
    return await this.userService.BasketList(req.user.id);
  }
  @Post('basket')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '장바구니 추가',
    description: '받은 엑세스토큰의 id에 해당 상품을 basket에 추가한다.',
  })
  async addBasket(
    @Request() req,
    @Body() BasketListDto: BasketListDto,
  ): Promise<any> {
    return await this.userService.addBasket(req.user.id, BasketListDto);
  }
  @Delete('basket')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '장바구니 삭제',
    description: '받은 엑세스토큰의 id에 해당 상품을 basket에서 삭제한다.',
  })
  async deleteBasket(
    @Request() req,
    @Body() EditBasketListDto: EditBasketListDto,
  ): Promise<any> {
    return await this.userService.deleteBasket(req.user.id, EditBasketListDto);
  }
}
