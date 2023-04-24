import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuIdv4 } from 'uuid';

import { CreatePetDto } from './dto/pets.dto';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PetsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async getAll() {
    return await this.prismaService.pet.findMany();
  }

  async createPet(petData: CreatePetDto, userId: string) {
    const user = await this.userService.getById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.prismaService.pet.create({
      data: {
        id: uuIdv4(),
        ...petData,
        ownerId: user.id,
        // name: petData.name,
        // type: petData.type,
        // status: petData.status,
        // image: petData.image,
        // logo: petData.logo,
        // owner: petData.owner,
        // ownerId: petData.ownerId,
      },
    });
  }

  async checkUser(userId: string) {
    const user = await this.userService.getById(userId);
    if (!user) {
      return null;
    }

    return user;
  }

  async update(petData: any, userId: string): Promise<void> {
    const user = await this.userService.getById(userId);

    if (!user) {
      throw new HttpException(
        `User with ${userId} not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.prismaService.pet.update(petData);
  }
}
