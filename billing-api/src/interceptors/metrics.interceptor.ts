import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppMetrics } from '../services';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric(AppMetrics.requests.name) public requests: Counter<string>,
    @InjectMetric(AppMetrics.latency.name) public latency: Histogram<string>,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req, res] = context.getArgs();
    const end = this.latency.labels(req.method, res.statusCode).startTimer();
    this.requests.labels(req.method, res.statusCode).inc();
    return next.handle().pipe(tap(() => end()));
  }
}
