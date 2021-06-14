import { ClockCircleOutlined } from '@ant-design/icons';
import { Result } from 'antd';
import { OrderStatuses } from '../../../types/order-statuses';

import { StepProps } from './step-props';

export const PaymentProcessingStep: React.FC<StepProps> = ({ order, onRefreshOrder }) => {
  return (
    <>
      {order.status === OrderStatuses.Checkout && (
        <Result icon={<ClockCircleOutlined />} title="Происходит обработка платежа" />
      )}
      {order.status === OrderStatuses.PaymentDeclined && (
        <Result status="error" title="Платеж не прошел. Недостаточно средств для оплаты заказа" />
      )}
    </>
  );
};
