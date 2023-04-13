import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsersList(@Req() req: any, @Res() res: any) {
    const users = await this.usersService.getUsersList();
    res.status(HttpStatus.FOUND).json(users);
  }

  @Post()
  async create(@Req() req: any, @Body() body: CreateUserDto, @Res() res: any) {
    const user = await this.usersService.createUser(body);

    res.status(HttpStatus.CREATED).json(user);
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/:id')
  async getById(@Req() req: any, @Res() res: any, @Param('id') userId: string) {
    const userById = await this.usersService.getById(userId);
    res.status(HttpStatus.OK).json(userById);
  }

  @ApiParam({ name: 'id', required: true })
  @Delete('/:id')
  async delete(@Req() req: any, @Res() res: any, @Param('id') userId: string) {
    await this.usersService.deleteById(userId);
    res.sendStatus(HttpStatus.OK);
  }

  @ApiParam({ name: 'id', required: true })
  @Patch('/:id')
  async update(
    @Req() req: any,
    @Body() body: UpdateUserDto,
    @Res() res: any,
    @Param('id') userId: string,
  ) {
    const updUser = await this.usersService.updateUser(userId, body);

    res.status(HttpStatus.OK).json(updUser);
  }
}
