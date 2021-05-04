export interface MetricsDictionaryItem {
  name: string;
  help: string;
  labelNames: string[];
}

export enum Metrics {
  requests = 'requests',
  latency = 'latency',
  signInCount = 'signInCount',
  signUpCount = 'signUpCount',
}

export type MetricsDictionary = Record<Metrics, MetricsDictionaryItem>;
