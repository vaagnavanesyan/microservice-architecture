import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthControllerController {
  @Get()
  health() {
    return { status: 'ok' };
  }
}
