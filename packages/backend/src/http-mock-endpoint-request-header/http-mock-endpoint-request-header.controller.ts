import {
  HttpMockEndpointRequestHeaderCreateDto,
  HttpMockEndpointRequestHeaderDto,
  HttpMockEndpointRequestHeaderFindManyDto,
  HttpMockEndpointRequestHeaderUpdateDto
} from '@airplane/api-types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ValidateHttpHeaderId, ValidateHttpMockEndpointId } from '../http-mock-endpoint/http-mock-endpoint.pipes.js';
import { ValidateHttpMockId } from '../http-mock/http-mock.pipes.js';
import { ValidateMockServerId } from '../mock-server/mock-server.pipes.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('/mock-servers/:mockServerId/http-mocks/:httpMockId/endpoints/:httpMockEndpointId/request-headers')
export class HttpMockEndpointRequestHeaderController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Param('httpMockEndpointId', ValidateHttpMockEndpointId) httpMockEndpointId: number,
    @Body() body: HttpMockEndpointRequestHeaderCreateDto
  ): Promise<HttpMockEndpointRequestHeaderDto> {
    const result = await this.prismaService.httpHeader.create({
      data: {
        ...body,
        httpMockEndpoint: {
          connect: {
            id: httpMockEndpointId,
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
    @Param('httpMockEndpointId', ValidateHttpMockEndpointId) httpMockEndpointId: number,
    @Query() query: HttpMockEndpointRequestHeaderFindManyDto
  ): Promise<HttpMockEndpointRequestHeaderDto[]> {
    const results = await this.prismaService.httpHeader.findMany({
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
    });
    return results;
  }

  @Get('/:id')
  async findOne(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Param('httpMockEndpointId', ValidateHttpMockEndpointId) httpMockEndpointId: number,
    @Param('id', ValidateHttpHeaderId) id: number
  ): Promise<HttpMockEndpointRequestHeaderDto> {
    const result = await this.prismaService.httpHeader.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return result;
  }

  @Patch('/:id')
  async update(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Param('httpMockEndpointId', ValidateHttpMockEndpointId) httpMockEndpointId: number,
    @Param('id', ValidateHttpHeaderId) id: number,
    @Body() body: HttpMockEndpointRequestHeaderUpdateDto
  ): Promise<HttpMockEndpointRequestHeaderDto> {
    const result = await this.prismaService.httpHeader.update({
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
    @Param('id', ValidateHttpHeaderId) id: number
  ): Promise<HttpMockEndpointRequestHeaderDto> {
    const result = await this.prismaService.httpHeader.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
