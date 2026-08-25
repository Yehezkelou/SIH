import { Injectable } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerRequest } from '@nestjs/throttler';

@Injectable()
export class GatewayThrottlerGuard extends ThrottlerGuard {
  
  protected override async handleRequest(
    requestProps: ThrottlerRequest
  ): Promise<boolean> {
    const { context, throttler } = requestProps;
    const request = context.switchToHttp().getRequest();
    const path = request.path;

    // Appliquer la configuration "login" uniquement sur la route de login
    if (throttler.name === 'login' && path !== '/api/auth/login') {
      return true; // Ignorer et passer au throttler suivant
    }

    // Appliquer le rate limit standard
    return super.handleRequest(requestProps);
  }
}
