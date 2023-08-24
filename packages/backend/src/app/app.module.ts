import { Module } from '@nestjs/common';
import { HttpMockEndpointRequestHeaderModule } from '../http-mock-endpoint-request-header/http-mock-endpoint-request-header.module.js';
import { HttpMockEndpointResponseHeaderModule } from '../http-mock-endpoint-response-header/http-mock-endpoint-response-header.module.js';
import { HttpMockEndpointResponseModule } from '../http-mock-endpoint-response/http-mock-endpoint-response.module.js';
import { HttpMockEndpointModule } from '../http-mock-endpoint/http-mock-endpoint.module.js';
import { HttpMockModule } from '../http-mock/http-mock.module.js';
import { MockServerModule } from '../mock-server/mock-server.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [
    PrismaModule, //
    MockServerModule,
    HttpMockModule,
    HttpMockEndpointModule,
    HttpMockEndpointResponseModule,
    HttpMockEndpointRequestHeaderModule,
    HttpMockEndpointResponseHeaderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
