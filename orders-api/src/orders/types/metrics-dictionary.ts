export interface MetricsDictionaryItem {
  name: string;
  help: string;
  labelNames: string[];
}

export enum Metrics {
  requests = 'requests',
  latency = 'latency',
  ordersCount = 'ordersCount',
}

export type MetricsDictionary = Record<Metrics, MetricsDictionaryItem>;
