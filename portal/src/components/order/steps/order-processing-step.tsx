import { SyncOutlined } from '@ant-design/icons';
import { Result } from 'antd';

import { StepProps } from './step-props';

export const OrderProcessingStep: React.FC<StepProps> = ({ order, onRefreshOrder }) => {
  return <Result icon={<SyncOutlined />} title="Заказ находится в обработке" />;
};
