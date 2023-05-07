import { Injectable } from '@nestjs/common';
import { v4 as uuIdv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { PrismaService } from '../core/orm/prisma.service';
import { IUser } from '../core/constants/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsersList(): Promise<IUser[]> {
    return this.prismaService.user.findMany({
      // select: {
      //   id: true,
      //   name: true,
      //   email: true,
      //   status?: true,
      //   city?: true,
      //   pets?: true,
      // },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getById(userId: string): Promise<IUser> {
    return await this.prismaService.user.findFirst({
      where: { id: userId },
    });
  }

  async findOneByEmail(email: string): Promise<IUser> {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async createUser(userData: CreateUserDto): Promise<IUser> {
    const hash = await bcrypt.hash(userData.password, 8);

    return this.prismaService.user.create({
      data: {
        id: uuIdv4(),
        ...userData,
        password: hash,
      },
    });
  }

  async updateUser(userId: string, userData: UpdateUserDto): Promise<void> {
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...userData,
        updatedAt: new Date(),
      },
    });
  }

  async deleteById(userId: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id: userId },
    });
  }
}
