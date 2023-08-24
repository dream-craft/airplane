import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { HttpMockEndpointController } from './http-mock-endpoint.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [HttpMockEndpointController],
})
export class HttpMockEndpointModule {}
