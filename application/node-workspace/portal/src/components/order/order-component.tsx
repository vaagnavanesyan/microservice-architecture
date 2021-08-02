import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
  FileImageOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Space, Steps } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Order as IOrder } from '../../types/order';
import { OrderStatuses } from '../../types/order-statuses';

import { getOrder } from '../../utils/api-requests';
import { AddImageStep } from './steps/add-images.step';
import { PaymentStep } from './steps/payment-step';
import { OrderProcessingStep } from './steps/order-processing-step';
import { ResultStep } from './steps/result-step';
import { PaymentProcessingStep } from './steps/payment-processing-step';

const { Step } = Steps;
const addImageStep = 0;
const paymentProcessingStep = 2;
const orderProcessingStep = 3;
const resultStep = 4;
interface IStep {
  title: string;
  icon: JSX.Element;
  content: (order: IOrder, onRefreshOrder: () => void) => JSX.Element;
  nextStepButton?: {
    title: string;
  };
  prevStepButton?: {
    title: string;
  };
}
const steps: IStep[] = [
  {
    title: 'Добавление изображений',
    icon: <FileImageOutlined />,
    content: (order, onRefreshOrder) => <AddImageStep order={order} onRefreshOrder={onRefreshOrder} />,
    nextStepButton: { title: 'Перейти к оплате' },
  },
  {
    title: 'Оплата',
    icon: <CreditCardOutlined />,
    content: (order, onRefreshOrder) => <PaymentStep order={order} onRefreshOrder={onRefreshOrder} />,
    prevStepButton: { title: 'Изменить заказ' },
  },
  {
    title: 'Статус платежа',
    icon: <ClockCircleOutlined />,
    content: (order, onRefreshOrder) => <PaymentProcessingStep order={order} onRefreshOrder={onRefreshOrder} />,
    prevStepButton: { title: 'Перейти к оплате' },
  },
  {
    title: 'Обработка заказа',
    icon: <SyncOutlined />,
    content: (order, onRefreshOrder) => <OrderProcessingStep order={order} onRefreshOrder={onRefreshOrder} />,
  },
  {
    title: 'Результат',
    icon: <CheckCircleOutlined />,
    content: (order, onRefreshOrder) => <ResultStep order={order} onRefreshOrder={onRefreshOrder} />,
  },
];

export const Order = () => {
  const [current, setCurrent] = React.useState(addImageStep);
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState({} as IOrder);

  useEffect(() => {
    switch (order.status) {
      case OrderStatuses.Active:
        setCurrent(addImageStep);
        break;
      case OrderStatuses.Checkout:
      case OrderStatuses.PaymentDeclined:
        setCurrent(paymentProcessingStep);
        break;
      case OrderStatuses.PaymentSucceeded:
        setCurrent(orderProcessingStep);
        break;
      case OrderStatuses.Processed:
      case OrderStatuses.Cancelled:
        setCurrent(resultStep);
        break;
    }
  }, [order]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onRefreshOrder = useCallback(() => {
    const orderId = parseInt(id, 10);
    getOrder(orderId).then(setOrder);
  }, [id]);

  useEffect(() => {
    onRefreshOrder();
  }, [id, onRefreshOrder]);
  const currentStep = steps[current];
  return (
    <>
      <Space>
        {currentStep.prevStepButton && <Button onClick={prev}>{currentStep.prevStepButton.title}</Button>}
        {currentStep.nextStepButton && (
          <Button type="primary" onClick={next}>
            {currentStep.nextStepButton.title}
          </Button>
        )}
      </Space>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      {order.id && <div className="steps-content">{currentStep.content(order, onRefreshOrder)}</div>}
    </>
  );
};
