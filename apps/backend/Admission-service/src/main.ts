/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppAdmissionModule } from './modules/app.module';

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
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
