import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { MetricsDictionary } from '../types';

export const MetricsPrefix = 'identity';

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
  signInCount: {
    name: `${MetricsPrefix}_signInCount`,
    help: `${MetricsPrefix}_signInCount_help`,
    labelNames: [],
  },
  signUpCount: {
    name: `${MetricsPrefix}_signUpCount`,
    help: `${MetricsPrefix}_signUpCount_help`,
    labelNames: [],
  },
};
export const MetricsProviders = [
  makeCounterProvider(AppMetrics.requests),
  makeHistogramProvider(AppMetrics.latency),
  makeCounterProvider(AppMetrics.signInCount),
  makeCounterProvider(AppMetrics.signUpCount),
];
