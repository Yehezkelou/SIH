import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const globalPrefix = 'api';

  // TODO (voir doc) : gRPC hybride pour l'introspection de jeton inter-service
  //   app.connectMicroservice<MicroserviceOptions>({ transport: Transport.GRPC, ... })
  //   await app.startAllMicroservices();
  // TODO : app.enableCors({ origin: [...] }) avant de brancher le frontend

  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3003;
  await app.listen(port);

  Logger.log(`🚀 HTTP REST: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
