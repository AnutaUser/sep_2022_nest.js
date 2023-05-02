import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { CreatePetDto, UpdatePetDto } from './dto/pets.dto';
import { PetsService } from './pets.service';
import { editFileName, imgFileFilter } from '../core/file-upload/file-upload';
import { IPet } from '../core/constants/pet.interface';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async create(
    @Req() req: any,
    @Body() body: CreatePetDto,
    @Res() res: any,
    @Param() userId: string,
  ) {
    const pet = await this.petsService.createPet(body, userId);
    res.status(HttpStatus.CREATED).json(pet);
  }

  @Get()
  async getAll(@Req() req: any, @Body() body: IPet[], @Res() res: any) {
    const pets = await this.petsService.getAll();
    res.status(HttpStatus.OK).json(pets);
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/:id')
  async getById(
    @Req() req: any,
    @Body() body: IPet,
    @Res() res: any,
    @Param('id') id: string,
  ) {
    const pet = await this.petsService.getById(id);
    res.status(HttpStatus.OK).json(pet);
  }

  @ApiParam({ name: 'id', required: true })
  @Patch('/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: 'public/animals',
          filename: editFileName,
        }),
        fileFilter: imgFileFilter,
      },
    ),
  )
  async update(
    @Req() req: any,
    @Body() body: UpdatePetDto,
    @Res() res: any,
    @Param('id') id: string,
    // @UploadedFiles() files: Array<Express.Multer.File>,
    @UploadedFiles()
    files: {
      image?: Array<Express.Multer.File[]>;
      logo?: Array<Express.Multer.File[]>;
    },
  ) {
    if (files?.image) {
      body.image = `public/animals/${files[0]}.filename`;
    }

    if (files?.logo) {
      body.logo = `public/animals/${files[0]}.filename`;
    }

    const pet = await this.petsService.update(body, id);
    res.status(HttpStatus.OK).json(pet);
  }
}
