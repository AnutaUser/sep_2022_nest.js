import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { IUser } from '../core/constants/user.interface';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {
    super();
  }

  async validate(token: string): Promise<any> {
    let user: IUser;

    try {
      const payload = await this.jwtService.verify(token);

      user = await this.usersService.getById(payload.id);
    } catch (e) {
      console.log(new Date().toISOString(), token);
      throw new UnauthorizedException();
    }

    return user;
  }
}
