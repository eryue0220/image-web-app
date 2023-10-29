import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const res = await this.prisma.image.findMany();
    return res;
  }

  async findOne(jobId: number) {
    const res = await this.prisma.image.findUnique({ where: { jobId } });
    return res;
  }

  async create(data: any) {
    const res = await this.prisma.image.create({
      data: {
        img: data,
      },
    });
    return res;
  }
}
