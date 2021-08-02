import { Button, Space, Typography, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { useEffect, useState } from 'react';

import { checkoutOrder } from '../../../utils/api-requests';
import { StepProps } from './step-props';

export const PaymentStep: React.FC<StepProps> = ({ order, onRefreshOrder }) => {
  const [uploadedFiles, setUploadedFiles] = useState([] as UploadFile[]);
  useEffect(() => {
    setUploadedFiles(
      order.positions.map((position) => ({
        uid: position.id.toString(),
        name: position.originalImageName,
        url: position.originalImageUrl,
      }))
    );
  }, [order]);

  const handleOrderCheckout = async () => {
    await checkoutOrder(order.id);
    onRefreshOrder();
  };

  return (
    <Space direction="vertical">
      <Typography.Title level={2}>Содержимое заказа</Typography.Title>
      <Upload
        showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
        listType="picture-card"
        fileList={uploadedFiles}
      ></Upload>
      <Typography.Title level={2}>Стоимость заказа - ${order.price}</Typography.Title>
      <Button type="primary" onClick={handleOrderCheckout}>
        Оплатить заказ
      </Button>
    </Space>
  );
};
