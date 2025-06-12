import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ các field không khai báo trong DTO
      forbidNonWhitelisted: true,
      transform: true, // tự động transform các field về kiểu đã định (e.g. string)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
