import { CheckCircleOutlined, CreditCardOutlined, FileImageOutlined, SyncOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getOrder } from '../../utils/api-requests';
import { AddImageStep } from './steps/add-images.step';

const { Step } = Steps;
const steps = [
  {
    title: 'Добавление изображений',
    icon: <FileImageOutlined />,
    content: order => <AddImageStep order={order} />,
  },
  {
    title: 'Оплата',
    icon: <CreditCardOutlined />,
    content: () => 'оплата тутъ',
  },
  {
    title: 'Обработка заказа',
    icon: <SyncOutlined />,
    content: () => 'обработка...',
  }, {
    title: 'Результат',
    icon: <CheckCircleOutlined />,
    content: () => 'результат тут',
  },
];

export const Order = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState({});
  useEffect(() => {
    const orderId = parseInt(id, 10);
    getOrder(orderId).then(setOrder);
  }, [id]);

  return <>
    <Steps current={current}>
      {steps.map(item => (
        <Step key={item.title} title={item.title} icon={item.icon} />
      ))}
    </Steps>
    <div className="steps-content">{steps[current].content(order)}</div>
  </>


}