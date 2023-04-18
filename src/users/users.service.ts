import { Injectable } from '@nestjs/common';
import { v4 as uuIdv4 } from 'uuid';

import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { PrismaService } from '../core/orm/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsersList(): Promise<any> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        city: true,
        pets: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getById(userId: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: { id: userId },
    });
  }

  async createUser(userData: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        id: uuIdv4(),
        ...userData,
      },
    });
  }

  async updateUser(userId: string, userData: UpdateUserDto) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: userData,
    });
  }

  async deleteById(userId: string) {
    await this.prismaService.user.delete({
      where: { id: userId },
    });
  }
}
