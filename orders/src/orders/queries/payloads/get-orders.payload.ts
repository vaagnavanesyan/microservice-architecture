import { OrderStatuses } from 'src/orders/enums/order-statuses.enum';

export class GetOrdersPayload {
  ownerId: number;
  isAdmin: boolean;
  status?: OrderStatuses;
}
