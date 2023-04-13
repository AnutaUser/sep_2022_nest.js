import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private users: any = [];

  async getUsersList() {
    return this.users;
  }

  async getById(userId: string) {
    return await this.users.find((user) => user.id === userId);
  }

  async createUser(userData: CreateUserDto) {
    const newUser = { id: uuidv4(), ...userData };
    await this.users.push(newUser);

    return newUser;
  }

  async updateUser(userId: string, userData: UpdateUserDto) {
    const index = await this.users.findIndex((user) => user.id === userId);
    this.users[index] = { ...this.users[index], ...userData };
    return this.users[index];
  }

  async deleteById(userId: string) {
    const index = await this.users.findIndex((user) => user.id === userId);

    this.users.splice(index, 1);

    return this.users;
  }
}
