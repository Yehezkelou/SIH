import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PatientModule } from './modules/patient/patient.module';
import {ServerCredentials, ServerMetricRecorder} from "@grpc/grpc-js"
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(PatientModule);
  const globalPrefix = 'api';

  // Config gRPC microservice hybride
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'patient',
      protoPath: join(process.cwd(), 'libs/contracts/proto/patient.proto'),
      url: process.env.PATIENT_GRPC_URL ?? '0.0.0.0:50051',
      credentials : ServerCredentials.createSsl(
        readFileSync("certs/ca.crt"),
        [{
          private_key : readFileSync("certs/server.key"),
          cert_chain : readFileSync("certs/server.crt")
        }],
        true,
      )
    },
  });

  // Démarrage des microservices gRPC
  await app.startAllMicroservices();

  // Prefix HTTP REST
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 HTTP REST: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`🔌 gRPC Server: ${process.env.PATIENT_GRPC_URL ?? '0.0.0.0:50051'}`);
}

bootstrap();
