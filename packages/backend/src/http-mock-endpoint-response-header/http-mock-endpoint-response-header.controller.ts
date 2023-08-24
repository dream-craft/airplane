import {
  HttpMockEndpointResponseHeaderCreateDto,
  HttpMockEndpointResponseHeaderDto,
  HttpMockEndpointResponseHeaderFindManyDto,
  HttpMockEndpointResponseHeaderUpdateDto
} from '@airplane/api-types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ValidateHttpMockEndpointResponseId } from '../http-mock-endpoint-response/http-mock-endpoint-response.pipes.js';
import { ValidateHttpHeaderId, ValidateHttpMockEndpointId } from '../http-mock-endpoint/http-mock-endpoint.pipes.js';
import { ValidateHttpMockId } from '../http-mock/http-mock.pipes.js';
import { ValidateMockServerId } from '../mock-server/mock-server.pipes.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('/mock-servers/:mockServerId/http-mocks/:httpMockId/endpoints/:httpMockEndpointId/responses/:httpMockEndpointResponseId/headers')
export class HttpMockEndpointResponseHeaderController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Param('mockServerId', ValidateMockServerId) mockServerId: number,
    @Param('httpMockId', ValidateHttpMockId) httpMockId: number,
    @Param('httpMockEndpointId', ValidateHttpMockEndpointId) httpMockEndpointId: number,
    @Param('httpMockEndpointResponseId', ValidateHttpMockEndpointResponseId) httpMockEndpointResponseId: number,
    @Body() body: HttpMockEndpointResponseHeaderCreateDto
  ): Promise<HttpMockEndpointResponseHeaderDto> {
    const result = await this.prismaService.httpHeader.create({
      data: {
        ...body,
        httpMockEndpointResponse: {
          connect: {
            id: httpMockEndpointResponseId,
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
    @Param('httpMockEndpointResponseId', ValidateHttpMockEndpointResponseId) httpMockEndpointResponseId: number,
    @Query() query: HttpMockEndpointResponseHeaderFindManyDto
  ): Promise<HttpMockEndpointResponseHeaderDto[]> {
    const results = await this.prismaService.httpHeader.findMany({
      where: {
        httpMockEndpointResponseId,
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
    @Param('httpMockEndpointId', ValidateHttpMockId) httpMockEndpointId: number,
    @Param('httpMockEndpointResponseId', ValidateHttpMockEndpointResponseId) httpMockEndpointResponseId: number,
    @Param('id', ValidateHttpHeaderId) id: number
  ): Promise<HttpMockEndpointResponseHeaderDto> {
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
    @Param('httpMockEndpointResponseId', ValidateHttpMockEndpointResponseId) httpMockEndpointResponseId: number,
    @Param('id', ValidateHttpHeaderId) id: number,
    @Body() body: HttpMockEndpointResponseHeaderUpdateDto
  ): Promise<HttpMockEndpointResponseHeaderDto> {
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
    @Param('httpMockEndpointResponseId', ValidateHttpMockEndpointResponseId) httpMockEndpointResponseId: number,
    @Param('id', ValidateHttpHeaderId) id: number
  ): Promise<HttpMockEndpointResponseHeaderDto> {
    const result = await this.prismaService.httpHeader.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
