import { Button, Empty } from 'antd';
import React from 'react';

export const OrdersEmptyList = () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={<span>You don't have orders yet</span>}
  >
    <Button type="primary">Make first order</Button>
  </Empty>
);
