import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(
    @InjectMetric('user_api_requests') public counter: Counter<string>,
  ) {}
  use(req: Request, res: Response, next: () => void) {
    this.counter.labels(req.method).inc();
    next();
  }
}
