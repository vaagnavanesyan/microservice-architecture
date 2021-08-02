export interface MetricsDictionaryItem {
  name: string;
  help: string;
  labelNames: string[];
}

export enum Metrics {
  requests = 'requests',
  latency = 'latency',
  succeedPaymentsCount = 'succeedPaymentsCount',
}

export type MetricsDictionary = Record<Metrics, MetricsDictionaryItem>;
