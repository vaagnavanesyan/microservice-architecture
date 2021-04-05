import { AddImageHandler } from './add-image.handler';
import { CancelOrderHandler } from './cancel-order.handler';
import { CheckoutOrderHandler } from './checkout-order.handler';
import { CreateOrderHandler } from './create-order.handler';
import { RemoveImageHandler } from './remove-image.handler';
export const CommandHandlers = [
  AddImageHandler,
  CancelOrderHandler,
  CheckoutOrderHandler,
  CreateOrderHandler,
  RemoveImageHandler,
];
