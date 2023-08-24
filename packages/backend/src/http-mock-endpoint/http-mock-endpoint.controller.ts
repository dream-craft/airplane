import { HttpMockEndpointCreateDto, HttpMockEndpointDto, HttpMockEndpointFindManyDto, HttpMockEndpointUpdateDto } from '@airplane/api-types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { HttpMockEndpoint } from '@prisma/client';
import { ValidateHttpMockId } from '../http-mock/http-mock.pipes.js';
import { ValidateMockServerId } from '../mock-server/mock-server.pipes.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ValidateHttpMockEndpointId } from './http-mock-endpoint.pipes.js';

@Controller('/mock-servers/:mockServerId/http-mocks/:httpMockId/endpoints')
export class HttpMockEndpointController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Body() body: HttpMockEndpointCreateDto
  ): Promise<HttpMockEndpoint> {
    const result = await this.prismaService.httpMockEndpoint.create({
      data: {
        ...body,
        httpMock: {
          connect: {
            id: httpMockId,
          },
        },
      },
    });
    return result;
  }

  @Get()
  async findMany(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Query() query: HttpMockEndpointFindManyDto
  ): Promise<HttpMockEndpointDto[]> {
    const results = await this.prismaService.httpMockEndpoint.findMany({
      where: {
        httpMockId,
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
    });
    return results;
  }

  @Get('/:id')
  async findOne(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Param('id', ValidateHttpMockEndpointId) id: number
  ): Promise<HttpMockEndpointDto> {
    const result = await this.prismaService.httpMockEndpoint.findUniqueOrThrow({
      where: {
        id,
      },
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
    });
    return result;
  }

  @Patch('/:id')
  async update(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Param('id', ValidateHttpMockEndpointId) id: number,
    @Body() body: HttpMockEndpointUpdateDto
  ): Promise<HttpMockEndpoint> {
    const result = await this.prismaService.httpMockEndpoint.update({
      where: {
        id,
      },
      data: body,
    });
    return result;
  }

  @Delete('/:id')
  async delete(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Param('id', ValidateHttpMockEndpointId) id: number
  ): Promise<HttpMockEndpoint> {
    const result = await this.prismaService.httpMockEndpoint.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
