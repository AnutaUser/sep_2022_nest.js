import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { configs } from '../core/configs';
import { BearerStrategy } from './bearer.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from './auth.module';

@Global()
@Module({
  imports: [
    AuthModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: configs.JWT_TOKEN_SECRET,
        signOptions: { expiresIn: configs.JWT_TOKEN_EXPIRES_IN },
      }),
    }),
  ],
  providers: [BearerStrategy, UsersService],
  exports: [PassportModule],
})
export class PassportWrapperModule {}
