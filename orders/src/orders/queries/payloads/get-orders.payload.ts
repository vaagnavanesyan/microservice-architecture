import { OrderStatuses } from 'src/orders/enums/order-statuses.enum';

export enum SortByColumns {
  createdAt = 'createdAt',
  price = 'price',
}

export class GetOrdersPayload {
  ownerId: number;
  isAdmin: boolean;
  status?: OrderStatuses;
  sortBy?: SortByColumns;
  asc?: boolean;
}
