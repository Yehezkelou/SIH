import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/gateway.module';
import helmet from "helmet"
import {Logger as PinoLogger} from "nestjs-pino"
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bodyParser : false});



  // utilisation du logger pino 
  app.useLogger(app.get(PinoLogger))

  // securisation avec helmet
  app.use(helmet({
    contentSecurityPolicy : process.env.NODE_ENV === "production" ? undefined : false,
  }))

  // configuration CORS
  app.enableCors({
    origin : process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['*'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })



  // Configuration Swagger agrégée
  if (process.env.NODE_ENV !== 'production') {
    const emptyDocument = {
      openapi: '3.0.0',
      info: {
        title: 'API Gateway',
        version: '1.0.0',
      },
      paths: {},
    };
    SwaggerModule.setup('docs', app, emptyDocument, {
      swaggerOptions: {
        urls: [
          { url: '/api/auth/docs-json', name: 'Auth Service' },
          { url: '/api/patient/docs-json', name: 'Patient Identity Service' },
          { url: '/api/admission/docs-json', name: 'Admission Service' },
        ],
      },
    });
  }

  const port = process.env.PORT || 8080;
  await app.listen(port);

  Logger.log(`🚀 API Gateway is running on: http://localhost:${port}`);
  Logger.log(`📄 Documentation Swagger disponible sur: http://localhost:${port}/docs`);
}

bootstrap();
