import { ApiPropertyOptional } from '@nestjs/swagger';
import { HttpMockEndpoint, Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
import { FindManyDto } from './common/common.dto.js';

export class HttpMockEndpointCreateDto implements Pick<HttpMockEndpoint, 'description' | 'method' | 'path'> {
  @ApiPropertyOptional()
  @IsString()
  description: string = '';

  @ApiPropertyOptional()
  @IsString()
  method: string = 'GET';

  @ApiPropertyOptional()
  @IsString()
  path: string = '';
}

export class HttpMockEndpointFindManyDto extends FindManyDto {}

export class HttpMockEndpointUpdateDto implements Partial<HttpMockEndpointCreateDto> {}

export type HttpMockEndpointDto = Prisma.HttpMockEndpointGetPayload<{
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
}>;
