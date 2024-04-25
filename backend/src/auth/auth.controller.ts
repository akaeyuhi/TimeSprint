import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/strategies/auth.strategy';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Logs user in' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('login')
  login(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto.username, signInDto.password);
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
  async refreshAccessToken(@Req() req: Request) {
    return this.authService.refreshAccessToken(<JwtPayload>req.user);
  }
}
