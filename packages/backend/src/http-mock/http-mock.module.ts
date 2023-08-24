import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { HttpMockController } from './http-mock.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [HttpMockController],
})
export class HttpMockModule {}
