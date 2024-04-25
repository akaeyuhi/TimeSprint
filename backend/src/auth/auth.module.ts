import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthStrategy } from 'src/auth/strategies/auth.strategy';
import { RefreshStrategy } from 'src/auth/strategies/auth-refresh.strategy';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, RefreshStrategy, JwtAuthGuard],
  exports: [AuthService, AuthStrategy, RefreshStrategy, JwtAuthGuard],
})
export class AuthModule {}
