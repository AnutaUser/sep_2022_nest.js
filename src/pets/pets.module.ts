import { forwardRef, Module } from '@nestjs/common';

import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersService } from '../users/users.service';
import { PrismaModule } from '../core/orm/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule), PrismaModule],
  providers: [PetsService, PrismaService, UsersService],
  controllers: [PetsController],
  exports: [PetsService],
})
export class PetsModule {}
