import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AdminRole } from 'src/user/utils';

export type JwtPayload = {
  id: string;
  username: string;
  email: string;
  role: AdminRole;
};

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role,
    };
  }
}
