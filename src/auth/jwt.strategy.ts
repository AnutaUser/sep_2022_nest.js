import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { configs } from '../core/configs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configs.JWT_TOKEN_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    console.log(configs.JWT_TOKEN_SECRET_KEY);
    console.log('payload:', payload);
    return { userId: payload.sub, username: payload.username };
  }
}
