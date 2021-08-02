import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { MetricsDictionary } from '../types/metrics-dictionary';

export const MetricsPrefix = 'orders_api';

export const AppMetrics: MetricsDictionary = {
  requests: {
    name: `${MetricsPrefix}_requests`,
    help: `${MetricsPrefix}_requests_help`,
    labelNames: ['method', 'status_code'],
  },
  latency: {
    name: `${MetricsPrefix}_latency`,
    help: `${MetricsPrefix}_latency_help`,
    labelNames: ['method', 'status_code'],
  },
  ordersCount: {
    name: `${MetricsPrefix}_ordersCount`,
    help: `${MetricsPrefix}_ordersCount_help`,
    labelNames: [],
  },
};
export const MetricsProviders = [
  makeCounterProvider(AppMetrics.requests),
  makeHistogramProvider(AppMetrics.latency),
  makeCounterProvider(AppMetrics.ordersCount),
];
