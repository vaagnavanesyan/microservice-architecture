import './orders-component.css';

import { Table } from 'antd';
import { useEffect, useState } from 'react';

import { getOrders } from '../../utils/api-requests';
import { translateOrderStatus } from '../../utils/order-utils';
import { Order } from '../../types/order';

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
  const [orders, setOrders] = useState([] as Order[]);
  useEffect(() => {
    const fetchOrders = () => getOrders().then(setOrders);
    fetchOrders();
  }, [])
  return <Table columns={columns} dataSource={orders} rowKey="id" />;
}
