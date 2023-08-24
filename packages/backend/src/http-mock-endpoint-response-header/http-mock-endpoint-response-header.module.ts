import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { HttpMockEndpointResponseHeaderController } from './http-mock-endpoint-response-header.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [HttpMockEndpointResponseHeaderController],
})
export class HttpMockEndpointResponseHeaderModule {}
