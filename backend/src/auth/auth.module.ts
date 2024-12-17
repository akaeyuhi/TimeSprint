import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from 'src/auth/strategies/auth.strategy';
import { RefreshStrategy } from 'src/auth/strategies/auth-refresh.strategy';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { SiteAdminModule } from 'src/site-admin/site-admin.module';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    SiteAdminModule,
    RefreshTokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, RefreshStrategy, JwtAuthGuard],
  exports: [AuthService, AuthStrategy, RefreshStrategy, JwtAuthGuard],
})
export class AuthModule {}
