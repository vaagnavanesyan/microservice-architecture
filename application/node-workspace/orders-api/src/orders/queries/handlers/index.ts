import { GetImageHandler } from './get-image.handler';
import { GetOrderHandler } from './get-order.handler';
import { GetOrdersHandler } from './get-orders.handler';
import { GetPositionHandler } from './get-position.handler';

export const QueryHandlers = [GetOrdersHandler, GetOrderHandler, GetImageHandler, GetPositionHandler];
