import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MockServer, Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { FindManyDto } from './common/common.dto.js';

export class MockServerCreateDto implements Pick<MockServer, 'name' | 'description'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional()
  @IsString()
  description: string = '';
}

export class MockServerUpdateDto implements Partial<MockServerCreateDto> {}

export class MockServerFindManyDto extends FindManyDto {}

export type MockServerDto = Prisma.MockServerGetPayload<{
  include: {
    httpMock: {
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
    };
    wsMock: true;
  };
}>;
