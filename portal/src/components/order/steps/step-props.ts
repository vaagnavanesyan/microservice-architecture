import { Order } from '../../../types/order';

export type StepProps = {
  order: Order;
  onRefreshOrder: () => void;
};
