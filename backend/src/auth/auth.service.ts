import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from 'src/auth/strategies/auth.strategy';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    user: User,
  ): Promise<boolean> {
    const passwordCheck = await bcrypt.compare(password, user.password);
    return user.email === email && passwordCheck;
  }

  async doesUserExists(checkDto: CreateUserDto | LoginDto): Promise<boolean> {
    const user = await this.userService.findByEmail(checkDto.email);
    return !!user;
  }

  async login(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUserWithPassword(email);
    if (!user) {
      throw new NotFoundException(`User with such email doesn't exist`);
    }
    if (!(await this.validateUser(email, pass, user))) {
      throw new UnauthorizedException('Invalid password or email');
    }
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      sub: user.id,
    };
    const tokens = await this.getTokens(payload);
    return {
      ...tokens,
      user: {
        id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const check = await this.doesUserExists(createUserDto);
    if (check) {
      throw new ConflictException('Such user already exists');
    }
    await this.userService.createUser(createUserDto);
    return this.login(createUserDto.email, createUserDto.password);
  }

  async refreshAccessToken(user: JwtPayload) {
    console.log(user);
    const { accessToken } = await this.getTokens(user);
    return {
      accessToken,
    };
  }

  private async getTokens(
    payload: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
