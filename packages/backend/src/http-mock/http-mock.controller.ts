import { HttpMockCreateDto, HttpMockDto, HttpMockFindManyDto, HttpMockUpdateDto } from '@airplane/api-types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { HttpMock } from '@prisma/client';
import { ValidateMockServerId } from '../mock-server/mock-server.pipes.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ValidateHttpMockId } from './http-mock.pipes.js';

@Controller('/mock-servers/:mockServerId/http-mocks')
export class HttpMockController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(@Param('mockServerId', ValidateMockServerId) mockServerId: number, @Body() body: HttpMockCreateDto): Promise<HttpMock> {
    const result = await this.prismaService.httpMock.create({
      data: {
        ...body,
        mockServer: {
          connect: {
            id: mockServerId,
          },
        },
      },
    });
    return result;
  }

  @Get()
  async findMany(@Param('mockServerId', ValidateMockServerId) mockServerId: number, @Query() query: HttpMockFindManyDto): Promise<HttpMockDto[]> {
    const results = await this.prismaService.httpMock.findMany({
      where: {
        mockServerId,
      },
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
    });
    return results;
  }

  @Get('/:id')
  async findOne(@Param('mockServerId', ValidateMockServerId) mockServerId: number, @Param('id', ValidateHttpMockId) id: number): Promise<HttpMockDto> {
    const result = await this.prismaService.httpMock.findUniqueOrThrow({
      where: {
        id,
      },
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
    });
    return result;
  }

  @Patch('/:id')
  async update(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('id', ValidateHttpMockId) id: number,
    @Body() body: HttpMockUpdateDto
  ): Promise<HttpMock> {
    const result = await this.prismaService.httpMock.update({
      where: {
        id,
      },
      data: body,
    });
    return result;
  }

  @Delete('/:id')
  async delete(@Param('mockServerId', ValidateMockServerId) mockServerId: number, @Param('id', ValidateHttpMockId) id: number): Promise<HttpMock> {
    const result = await this.prismaService.httpMock.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
