import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    // whitelist: true -> will make sure that all unwanted or invalid properties passed to the request are automatically stripped out and removed.
    // forbidNonWhitelisted: true -> will stop a request from being processed if any non whitelised properties are present, throwing an error instead.
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
