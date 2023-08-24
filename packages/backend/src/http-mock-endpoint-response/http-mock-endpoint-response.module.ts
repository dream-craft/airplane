import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { HttpMockEndpointResponseController } from './http-mock-endpoint-response.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [HttpMockEndpointResponseController],
})
export class HttpMockEndpointResponseModule {}
