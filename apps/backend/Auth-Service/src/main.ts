import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { ServerCredentials } from '@grpc/grpc-js';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const globalPrefix = 'api';

  // Configuration du microservice hybride gRPC en mTLS
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(process.cwd(), 'libs/contracts/proto/auth.proto'),
      url: process.env.AUTH_GRPC_URL ?? '0.0.0.0:50052',
      credentials: ServerCredentials.createSsl(
        readFileSync(join(process.cwd(), 'certs/ca.crt')),
        [{
          private_key: readFileSync(join(process.cwd(), 'certs/server.key')),
          cert_chain: readFileSync(join(process.cwd(), 'certs/server.crt')),
        }],
        true,
      ),
    },
  });

  // Configuration CORS pour le frontend
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?
            process.env.CORS_ORIGIN.split(',') 
            : ['*'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Démarrage des microservices gRPC associés
  await app.startAllMicroservices();

  // Préfixe HTTP REST
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3003;
  await app.listen(port);

  Logger.log(`🚀 HTTP REST: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`🔌 gRPC Server: ${process.env.AUTH_GRPC_URL ?? '0.0.0.0:50052'}`);
}

bootstrap();
