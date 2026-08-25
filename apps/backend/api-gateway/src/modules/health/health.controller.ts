import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const authUrl = process.env.AUTH_HTTP_URL || 'http://localhost:3003';
    const patientUrl = process.env.PATIENT_HTTP_URL || 'http://localhost:3001';
    const admissionUrl = process.env.ADMISSION_HTTP_URL || 'http://localhost:3002';

    return this.health.check([
      () => this.http.pingCheck('auth-service', `${authUrl}/health`, { timeout: 3000 }),
      () => this.http.pingCheck('patient-identity-service', `${patientUrl}/health`, { timeout: 3000 }),
      () => this.http.pingCheck('admission-service', `${admissionUrl}/health`, { timeout: 3000 }),
    ]);
  }
}
