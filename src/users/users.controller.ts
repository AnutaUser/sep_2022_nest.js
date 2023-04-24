import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { editFileName, imgFileFilter } from '../core/file-upload/file-upload';
import { PetsService } from '../pets/pets.service';
import { CreatePetDto } from '../pets/dto/pets.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly petsService: PetsService,
  ) {}

  @Get()
  async getUsersList(@Req() req: any, @Res() res: any) {
    const users = await this.usersService.getUsersList();
    res.status(HttpStatus.FOUND).json(users);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({ destination: './public', filename: editFileName }),
      fileFilter: imgFileFilter,
    }),
  )
  async create(
    @Req() req: any,
    @Body() body: CreateUserDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      body.avatar = `./public/${file.filename}`;
    }
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

  @ApiParam({ name: 'userId', required: true })
  @Post('/animals/:userId')
  async addPet(
    @Req() req: any,
    @Body() body: CreatePetDto,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    const user = await this.usersService.getById(userId);
    console.log(user);
    if (!user) {
      throw new HttpException(
        `User with ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );

      return res
        .status(HttpStatus.CREATED)
        .json(await this.petsService.createPet(body, userId));
    }
  }
}
