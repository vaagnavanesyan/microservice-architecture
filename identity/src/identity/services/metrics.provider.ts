import {
  makeCounterProvider,
  makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';
export const metrics = [
  makeCounterProvider({
    name: 'api_gateway_requests',
    help: 'api_gateway_requests_help',
    labelNames: ['method', 'status_code'],
  }),
  makeHistogramProvider({
    name: 'api_gateway_latency',
    help: 'api_gateway_latency_help',
    labelNames: ['method', 'status_code'],
  }),
];
