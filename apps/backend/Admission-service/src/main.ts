/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppAdmissionModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppAdmissionModule);

  // prefixe
  const globalPrefix = 'api';

  // configuration cors
  app.enableCors({
    origin : process.env.CORS_ORIGIN ?
             process.env.CORS_ORIGIN.split(',') 
             : ["*"],
    methods : ["GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"],
    credentials : true,
  })

  app.setGlobalPrefix(globalPrefix);
  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Admission Service')
    .setDescription('API de Gestion des Admissions et Mouvements')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/admission/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
