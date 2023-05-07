import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { PrismaModule } from './core/orm/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { PetsController } from './pets/pets.controller';
import { PetsService } from './pets/pets.service';
import { PassportWrapperModule } from './auth/passport-wrapper.module';

@Module({
  imports: [
    UsersModule,
    PetsModule,
    PrismaModule,
    AuthModule,
    PassportWrapperModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '', 'public'),
    // }),
  ],
  controllers: [AppController, UsersController, AuthController, PetsController],
  providers: [AppService, UsersService, PetsService, PrismaModule],
})
export class AppModule {}
