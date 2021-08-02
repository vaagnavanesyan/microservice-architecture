import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { MetricsDictionary } from '../types';

export const MetricsPrefix = 'billing';

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
  succeedPaymentsCount: {
    name: `${MetricsPrefix}_succeedPaymentsCount`,
    help: `${MetricsPrefix}_succeedPaymentsCount_help`,
    labelNames: [],
  },
};
export const MetricsProviders = [
  makeCounterProvider(AppMetrics.requests),
  makeHistogramProvider(AppMetrics.latency),
  makeCounterProvider(AppMetrics.succeedPaymentsCount),
];
