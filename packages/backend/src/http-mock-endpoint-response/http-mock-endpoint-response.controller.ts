import {
  HttpMockEndpointResponseCreateDto,
  HttpMockEndpointResponseDto,
  HttpMockEndpointResponseFindManyDto,
  HttpMockEndpointResponseUpdateDto
} from '@airplane/api-types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { HttpMockEndpointResponse } from '@prisma/client';
import { ValidateHttpMockEndpointId } from '../http-mock-endpoint/http-mock-endpoint.pipes.js';
import { ValidateHttpMockId } from '../http-mock/http-mock.pipes.js';
import { ValidateMockServerId } from '../mock-server/mock-server.pipes.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ValidateHttpMockEndpointResponseId } from './http-mock-endpoint-response.pipes.js';

@Controller('/mock-servers/:mockServerId/http-mocks/:httpMockId/endpoints/:httpMockEndpointId/responses')
export class HttpMockEndpointResponseController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Param('httpMockEndpointId', ValidateHttpMockEndpointId) httpMockEndpointId: number,
    @Body() body: HttpMockEndpointResponseCreateDto
  ): Promise<HttpMockEndpointResponse> {
    const result = await this.prismaService.httpMockEndpointResponse.create({
      data: {
        ...body,
        httpMockEndpoint: {
          connect: {
            id: httpMockEndpointId,
          },
        },
      },
    });
    await this.prismaService.httpMockEndpoint.update({
      where: {
        id: httpMockEndpointId,
        currentResponseId: null,
      },
      data: {
        currentResponseId: result.id,
      },
    });
    return result;
  }

  @Get()
  async findMany(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Param('httpMockEndpointId', ValidateHttpMockEndpointId) httpMockEndpointId: number,
    @Query() query: HttpMockEndpointResponseFindManyDto
  ): Promise<HttpMockEndpointResponseDto[]> {
    const results = await this.prismaService.httpMockEndpointResponse.findMany({
      where: {
        httpMockEndpointId,
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
        headers: true,
      },
    });
    return results;
  }

  @Get('/:id')
  async findOne(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Param('httpMockEndpointId', ValidateHttpMockEndpointId) httpMockEndpointId: number,
    @Param('id', ValidateHttpMockEndpointResponseId) id: number
  ): Promise<HttpMockEndpointResponseDto> {
    const result = await this.prismaService.httpMockEndpointResponse.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        headers: true,
      },
    });
    return result;
  }

  @Patch('/:id')
  async update(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Param('httpMockEndpointId', ValidateHttpMockEndpointId) httpMockEndpointId: number,
    @Param('id', ValidateHttpMockEndpointResponseId) id: number,
    @Body() body: HttpMockEndpointResponseUpdateDto
  ): Promise<HttpMockEndpointResponse> {
    const result = await this.prismaService.httpMockEndpointResponse.update({
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
    @Param('httpMockEndpointId', ValidateHttpMockEndpointId) httpMockEndpointId: number,
    @Param('id', ValidateHttpMockEndpointResponseId) id: number
  ): Promise<HttpMockEndpointResponse> {
    const result = await this.prismaService.httpMockEndpointResponse.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
