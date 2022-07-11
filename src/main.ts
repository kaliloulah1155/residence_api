import { NestFactory } from '@nestjs/core';
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { doc } from 'prettier';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const options=new DocumentBuilder()
    .setTitle('API FOR RESIDENCE')
    .setDescription('Api for residence v1.0.0')
    .setVersion('1.0.0')
    .build();
  const document=SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api',app,document);
  await app.listen(3333);
}
bootstrap();
