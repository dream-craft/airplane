import { MockServerCreateDto, MockServerDto, MockServerFindManyDto, MockServerUpdateDto } from '@airplane/api-types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MockServer } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { ValidateMockServerId } from './mock-server.pipes.js';

@Controller('/mock-servers')
export class MockServerController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(@Body() body: MockServerCreateDto): Promise<MockServer> {
    const result = await this.prismaService.mockServer.create({
      data: body,
    });
    return result;
  }

  @Get()
  async findMany(@Query() query: MockServerFindManyDto): Promise<MockServerDto[]> {
    const results = await this.prismaService.mockServer.findMany({
      take: query.take,
      skip: query.skip,
      cursor: query.cursor
        ? {
            id: query.cursor,
          }
        : undefined,
      orderBy: {
        id: 'asc',
      },
      include: {
        httpMock: {
          include: {
            httpMockEndpoints: {
              include: {
                allowedRequestHeaders: true,
                currentResponse: {
                  include: {
                    headers: true,
                  },
                },
                responses: {
                  include: {
                    headers: true,
                  },
                },
              },
            },
          },
        },
        wsMock: true,
      },
    });
    return results;
  }

  @Get('/:id')
  async findOne(@Param('id', ValidateMockServerId) id: number): Promise<MockServerDto> {
    const result = await this.prismaService.mockServer.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        httpMock: {
          include: {
            httpMockEndpoints: {
              include: {
                allowedRequestHeaders: true,
                currentResponse: {
                  include: {
                    headers: true,
                  },
                },
                responses: {
                  include: {
                    headers: true,
                  },
                },
              },
            },
          },
        },
        wsMock: true,
      },
    });
    return result;
  }

  @Patch('/:id')
  async update(@Param('id', ValidateMockServerId) id: number, @Body() body: MockServerUpdateDto): Promise<MockServer> {
    const result = await this.prismaService.mockServer.update({
      where: {
        id,
      },
      data: body,
    });
    return result;
  }

  @Delete('/:id')
  async delete(@Param('id', ValidateMockServerId) id: number): Promise<MockServer> {
    const result = await this.prismaService.mockServer.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
