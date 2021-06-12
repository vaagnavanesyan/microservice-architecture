import { OrderStatuses } from '../types/order-statuses';

export function translateOrderStatus(status: string): string {
  switch (status) {
    case OrderStatuses.Active:
      return 'Активный';
    case OrderStatuses.Checkout:
      return 'Ожидает оплаты';
    case OrderStatuses.PaymentSucceeded:
      return 'Оплачен';
    case OrderStatuses.PaymentDeclined:
      return 'Ошибка оплаты';
    case OrderStatuses.Processed:
      return 'Обработан';
    case OrderStatuses.Cancelled:
      return 'Отменен';
    default:
      return status;
  }
}
