import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AuthModule } from './auth/auth.module';
import { GatewayAuthGuard } from './auth/gateway-auth.guard';
import { LoggerModuleGlobale } from '../../../../../libs/logger/src/index';
import { routesConfig } from './config/routes.config';
import { CorrelationIdMiddleware } from './shared/middleware/correlation-id.middleware';
import { HealthModule } from './health/health.module';
import { GatewayThrottlerGuard } from './shared/guards/gateway-throttler.guard';

@Module({
  imports: [
    LoggerModuleGlobale.forRoot('ApiGateway'),
    AuthModule,
    HealthModule,
    // Configuration des deux profils de rate limiting
    ThrottlerModule.forRoot([
      {
        name: 'global',
        ttl: Number(process.env.THROTTLE_TTL) || 60,
        limit: Number(process.env.THROTTLE_LIMIT) || 100,
      },
      {
        name: 'login',
        ttl: 60, // 1 minute
        limit: 5,  // Max 5 requêtes
      }
    ])
  ],
  providers: [
    // 1. Protection contre les abus (Rate Limit) s'exécute en premier
    {
      provide: APP_GUARD,
      useClass: GatewayThrottlerGuard,
    },
    // 2. Validation du jeton et permissions (Auth) s'exécute en second
    {
      provide: APP_GUARD,
      useClass: GatewayAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes('*');

    for (const route of routesConfig) {
      consumer
        .apply(
          createProxyMiddleware({
            target: route.target,
            changeOrigin: true,
            timeout: 10000,
            proxyTimeout: 10000,
            on: {
              proxyReq: (proxyReq, req: any) => {
                if (req.headers.authorization) {
                  proxyReq.setHeader('authorization', req.headers.authorization);
                }
                if (req.headers['x-correlation-id']) {
                  proxyReq.setHeader('x-correlation-id', req.headers['x-correlation-id']);
                }
                if (req.headers['x-user-id']) {
                  proxyReq.setHeader('x-user-id', req.headers['x-user-id']);
                }
                if (req.headers['x-user-matricule']) {
                  proxyReq.setHeader('x-user-matricule', req.headers['x-user-matricule']);
                }
                if (req.headers['x-user-roles']) {
                  proxyReq.setHeader('x-user-roles', req.headers['x-user-roles']);
                }
                if (req.headers['x-user-permissions']) {
                  proxyReq.setHeader('x-user-permissions', req.headers['x-user-permissions']);
                }
              },
              error: (err, req, res: any) => {
                res.status(502).json({
                  statusCode: 502,
                  message: 'Bad Gateway : le microservice cible est injoignable ou a expiré.',
                  error: err.message,
                  timestamp: new Date().toISOString(),
                });
              }
            }
          })
        )
        .forRoutes(route.prefix, route.prefix + "/*");
    }
  }
}
