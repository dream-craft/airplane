import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpHeader, Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
import { FindManyDto } from './common/common.dto.js';

export class HttpMockEndpointRequestHeaderCreateDto implements Pick<HttpHeader, 'name' | 'value'> {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsString()
  value: string = '';
}

export class HttpMockEndpointRequestHeaderFindManyDto extends FindManyDto {}

export class HttpMockEndpointRequestHeaderUpdateDto implements Partial<HttpMockEndpointRequestHeaderCreateDto> {}

export type HttpMockEndpointRequestHeaderDto = Prisma.HttpHeaderGetPayload<{}>;
