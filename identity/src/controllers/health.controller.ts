import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health')
export class HealthController {
  @Get()
  health() {
    return { status: 'ok' };
  }

  @Get('setCode/:code')
  makeError(@Param() { code }, @Res() response: Response) {
    response.status(code).send();
  }
}
