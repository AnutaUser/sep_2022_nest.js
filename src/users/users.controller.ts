import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
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
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => PetsService))
    private readonly petsService: PetsService,
  ) {}

  @UseGuards(AuthGuard())
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

  @ApiParam({ name: 'id', required: true })
  @Post('/animals/:id')
  async addPet(
    @Req() req: any,
    @Body() body: CreatePetDto,
    @Res() res: any,
    @Param('id') id: string,
  ) {
    const user = await this.usersService.getById(id);

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: `User with id: ${id} not found` });
    }

    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.createPet(body, id));
  }
}
