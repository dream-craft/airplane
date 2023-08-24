import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { MockServerController } from './mock-server.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [MockServerController],
})
export class MockServerModule {}
