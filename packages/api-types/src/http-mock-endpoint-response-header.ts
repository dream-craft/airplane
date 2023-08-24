import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpHeader, Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
import { FindManyDto } from './common/common.dto.js';

export class HttpMockEndpointResponseHeaderCreateDto implements Pick<HttpHeader, 'name' | 'value'> {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsString()
  value: string = '';
}

export class HttpMockEndpointResponseHeaderFindManyDto extends FindManyDto {}

export class HttpMockEndpointResponseHeaderUpdateDto implements Partial<HttpMockEndpointResponseHeaderCreateDto> {}

export type HttpMockEndpointResponseHeaderDto = Prisma.HttpHeaderGetPayload<{}>;
