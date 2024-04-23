import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthStrategy } from 'src/auth/strategies/auth.strategy';
import { RefreshStrategy } from 'src/auth/strategies/auth-refresh.strategy';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    AuthStrategy,
    RefreshStrategy,
    UserRepository,
  ],
})
export class AuthModule {}
