import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AuthModule } from './auth/auth.module';
import { GatewayAuthMiddleware } from './auth/gateway-auth.middleware';
import { LoggerModuleGlobale } from '../../../../../libs/logger/src/index';
import { routesConfig } from './config/routes.config';
import { CorsMiddleware } from './shared/middleware/cors.middleware';
import { CorrelationIdMiddleware } from './shared/middleware/correlation-id.middleware';
import { RateLimitMiddleware } from './shared/middleware/rate-limit.middleware';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    LoggerModuleGlobale.forRoot('ApiGateway'),
    AuthModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // IMPORTANT : le proxy termine la requête au niveau middleware, avant la
    // couche des guards NestJS. Toute la sécurité doit donc être appliquée en
    // middleware, AVANT le proxy, dans cet ordre :
    //   1. CORS (+ préflight)  2. Correlation-id  3. Rate limiting  4. Auth  5. Proxy
    consumer
      .apply(CorsMiddleware, CorrelationIdMiddleware, RateLimitMiddleware, GatewayAuthMiddleware)
      .forRoutes('*');

    for (const route of routesConfig) {
      consumer
        .apply(
          createProxyMiddleware({
            target: route.target,
            changeOrigin: true,
            timeout: 10000,
            proxyTimeout: 10000,
            // Le middleware est monté sur route.prefix : http-proxy-middleware
            // ne verrait que le chemin relatif (ex. "/login"). On réémet le
            // chemin complet d'origine pour que le microservice le reçoive
            // avec son préfixe (ex. "/api/auth/login").
            pathRewrite: (_path, req: any) => req.originalUrl,
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
