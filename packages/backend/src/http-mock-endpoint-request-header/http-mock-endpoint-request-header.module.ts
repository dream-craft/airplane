import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { HttpMockEndpointRequestHeaderController } from './http-mock-endpoint-request-header.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [HttpMockEndpointRequestHeaderController],
})
export class HttpMockEndpointRequestHeaderModule {}
