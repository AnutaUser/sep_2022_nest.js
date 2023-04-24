import { forwardRef, Module } from '@nestjs/common';

import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [forwardRef(() => PetsModule)],
  providers: [PetsService, PrismaService, UsersService],
  controllers: [PetsController],
  exports: [PetsService],
})
export class PetsModule {}
