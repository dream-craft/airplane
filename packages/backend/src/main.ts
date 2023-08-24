import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import { Logger } from './logger.js';
import { WinstonModule } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = Logger.create(bootstrap);
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: Logger.create('Nest'),
    }),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    })
  ).enableCors();

  const config = new DocumentBuilder() //
    .setTitle('Airplane API')
    .setDescription('The airplane API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3100, '0.0.0.0');
  logger.info(`Application is running on: ${await app.getUrl()}`);
}

await bootstrap();
