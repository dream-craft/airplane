import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ValidateHttpMockEndpointId implements PipeTransform {
  constructor(private readonly prismaService: PrismaService) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    const item = await this.prismaService.httpMockEndpoint.findUnique({
      where: {
        id: value,
      },
    });
    if (!item) {
      throw new HttpException(`Http mock endpoint with id ${value} not found`, HttpStatus.NOT_FOUND);
    }
    return value;
  }
}

@Injectable()
export class ValidateHttpHeaderId implements PipeTransform {
  constructor(private readonly prismaService: PrismaService) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    const item = await this.prismaService.httpHeader.findUnique({
      where: {
        id: value,
      },
    });
    if (!item) {
      throw new HttpException(`Http header with id ${value} not found`, HttpStatus.NOT_FOUND);
    }
    return value;
  }
}
