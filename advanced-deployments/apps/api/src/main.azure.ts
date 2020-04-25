import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  await app.init();
  return app;
}