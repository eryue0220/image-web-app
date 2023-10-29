import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ImageService } from './image.service';
import { Response } from 'express';

interface ResponseData {
  jobId: number;
  createdAt: Date;
  updateAt: Date;
  img: Buffer;
}

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  @ApiOperation({ summary: 'Find Image According to jobId ' })
  @ApiQuery({ name: 'jobId', type: 'string' })
  async query(
    @Query('jobId', ParseIntPipe) jobId?: number,
  ): Promise<ResponseData[] | ResponseData> {
    const result = jobId
      ? await this.imageService.findOne(jobId)
      : await this.imageService.findAll();

    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Save Image', description: 'Save Image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'schema',
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file, @Res() res: Response) {
    const result = await this.imageService.create(file.buffer);
    res
      .status(result.jobId ? HttpStatus.OK : HttpStatus.EXPECTATION_FAILED)
      .send(result);
  }
}
