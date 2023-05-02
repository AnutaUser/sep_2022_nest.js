import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { PrismaService } from './core/orm/prisma.service';
import { PrismaModule } from './core/orm/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PetsController } from './pets/pets.controller';
import { PetsService } from './pets/pets.service';

@Module({
  imports: [UsersModule, PetsModule, PrismaModule, AuthModule, JwtModule],
  controllers: [AppController, UsersController, AuthController, PetsController],
  providers: [
    AppService,
    UsersService,
    PetsService,
    PrismaService,
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
