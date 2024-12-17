import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post, Put,
  Req,
  UseGuards
} from "@nestjs/common";
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/strategies/auth.strategy';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SiteAdminGuard } from "src/site-admin/guards/site-admin.guard";
import { IsUserRole } from "src/site-admin/decorators/site-admin.decorator";
import { AdminRole } from "src/user/utils";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Logs user in' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('login')
  login(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto.email, signInDto.password);
  }

  @ApiOperation({ summary: 'Registers new user in' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const response = await this.authService.register(createUserDto);
    return {
      message: 'User has been created successfully',
      response,
    };
  }

  @Get('refresh')
  @ApiOperation({ summary: 'Gets token by refresh token' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshAccessToken(@Req() req: Request, @Body() refreshToken: string) {
    return this.authService.refreshAccessToken(<JwtPayload>req.user, refreshToken);
  }

  @Put('refresh')
  @ApiOperation({ summary: 'Toggles refresh token status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseGuards(SiteAdminGuard)
  @IsUserRole(AdminRole.ADMIN)
  async toggleRefreshToken(@Body() refreshToken: string) {
    return this.authService.banRefresh(refreshToken);
  }
}
