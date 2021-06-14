import './orders-component.css';

import { PlusCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Space, Table } from 'antd';
import { useEffect, useState } from 'react';

import { Order } from '../../types/order';
import { createOrder, getOrders } from '../../utils/api-requests';
import { translateOrderStatus } from '../../utils/order-utils';
import { useHistory } from 'react-router-dom';

const columns = [
  {
    title: 'Номер заказа',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
    defaultSortOrder: 'descend' as any,
    render: (id) => <a href={`orders/${id}`}>{id}</a>,
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
    render: (date) => date.toLocaleDateString(),
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    render: (price) => <>${price}</>,
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    render: translateOrderStatus,
    key: 'status',
  },
];


export const Orders = () => {
  const history = useHistory();
  const [orders, setOrders] = useState([] as Order[]);
  const [showError, setError] = useState(false);

  useEffect(() => {
    const fetchOrders = () => getOrders().then(orders => setOrders(orders || []));
    fetchOrders();
  }, []);

  const handleCreateOrder = async () => {
    const id = await createOrder(orders.length.toString());
    if (id) {
      history.push(`/orders/${id}`);
    } else {
      setError(true)
    }
  }

  return <>
    <Space>
      <Button type="primary" icon={<PlusCircleOutlined />} onClick={handleCreateOrder}></Button>
      {showError && <Alert message="При создании заказа произошла ошибка. Обновите страницу и попробуйте еще раз" type="error" />}
    </Space>
    <Table columns={columns} dataSource={orders} rowKey="id" />
  </>;
}
