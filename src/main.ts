import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'winston-daily-rotate-file';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix for all routes
  app.setGlobalPrefix('api/v1');

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that are not included in the DTO
      forbidNonWhitelisted: true, // Throws an error if any non-whitelisted properties are sent
      transform: true, // Automatically transforms the payloads to be instances of the DTO classes
    }),
  );
  await app.listen(3000);
}
bootstrap();
