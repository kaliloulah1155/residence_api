import { NestFactory } from '@nestjs/core';
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
   app.use(morgan('dev'));

   //config cors
  const corsOptions={
    orgin:['http://localhost:4200']
  }
  // @ts-ignore
  app.enableCors(corsOptions)
  //Debut configuration de SWAGGER
  const options=new DocumentBuilder()
    .setTitle('API FOR RESIDENCE')
    .setDescription('Api for residence v1.0.0')
    .setVersion('1.0.0')
    .addBearerAuth(
      {type:'http',scheme:'bearer',bearerFormat:'Token'},
      'access-token'
      )
    .build();
  const document=SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api',app,document);
  //Fin configuration de SWAGGER

  //Debut configuration Pipe
   app.useGlobalPipes(new ValidationPipe({
     transform:true,
     whitelist:true,
     forbidNonWhitelisted:true
   }))
  //Fin configuration Pipe

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
