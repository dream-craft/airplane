import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ValidateMockServerId implements PipeTransform {
  constructor(private readonly prismaService: PrismaService) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    const item = await this.prismaService.mockServer.findUnique({
      where: {
        id: value,
      },
    });
    if (!item) {
      throw new HttpException(`Mock server with id ${value} not found`, HttpStatus.NOT_FOUND);
    }
    return value;
  }
}
