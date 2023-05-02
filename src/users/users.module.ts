import { forwardRef, Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersService } from './users.service';
import { PetsService } from '../pets/pets.service';
import { PrismaModule } from '../core/orm/prisma.module';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [forwardRef(() => PetsModule), PrismaModule],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, PetsService],
})
export class UsersModule {}
