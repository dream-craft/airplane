import { ApiPropertyOptional } from '@nestjs/swagger';
import { HttpMock, Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
import { FindManyDto } from './common/common.dto.js';

export class HttpMockCreateDto implements Pick<HttpMock, 'baseUrl'> {
  @ApiPropertyOptional()
  @IsString()
  baseUrl: string = '';
}

export class HttpMockFindManyDto extends FindManyDto {}

export class HttpMockUpdateDto implements Partial<HttpMockCreateDto> {}

export type HttpMockDto = Prisma.HttpMockGetPayload<{
  include: {
    httpMockEndpoints: {
      include: {
        allowedRequestHeaders: true;
        currentResponse: {
          include: {
            headers: true;
          };
        };
        responses: {
          include: {
            headers: true;
          };
        };
      };
    };
  };
}>;
