/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { initTracing } from '../../../../libs/logger/src';
initTracing("Patient-Identity-Service")


import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PatientModule } from './modules/patient/patient.module'


async function bootstrap() {
  const app = await NestFactory.create(PatientModule);
  const globalPrefix = 'api';


  app.setGlobalPrefix(globalPrefix);
 


  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
