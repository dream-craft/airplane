import { ApiPropertyOptional } from '@nestjs/swagger';
import { HttpMockEndpointResponse, Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { FindManyDto } from './common/common.dto.js';

export class HttpMockEndpointResponseCreateDto implements Pick<HttpMockEndpointResponse, 'statusCode' | 'body'> {
  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  statusCode: number = 200;

  @ApiPropertyOptional()
  @IsString()
  body: string = '';
}

export class HttpMockEndpointResponseFindManyDto extends FindManyDto {}

export class HttpMockEndpointResponseUpdateDto implements Partial<HttpMockEndpointResponseCreateDto> {}

export type HttpMockEndpointResponseDto = Prisma.HttpMockEndpointResponseGetPayload<{
  include: {
    headers: true;
  };
}>;
