import { Result, Space, Typography, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { useEffect, useState } from 'react';

import { OrderStatuses } from '../../../types/order-statuses';
import { downloadImage } from '../../../utils/api-requests';
import { StepProps } from './step-props';

export const ResultStep: React.FC<StepProps> = ({ order, onRefreshOrder }) => {
  const [originalFiles, setOriginalFiles] = useState([] as UploadFile[]);
  const [processedlFiles, setProcessedFiles] = useState([] as UploadFile[]);
  useEffect(() => {
    setOriginalFiles(
      order.positions.map((position) => ({
        uid: position.id.toString(),
        name: position.originalImageName,
        url: position.originalImageUrl,
      }))
    );

    setProcessedFiles(
      order.positions.map((position) => ({
        uid: position.id.toString(),
        name: position.originalImageName,
        url: position.processedImageUrl,
      }))
    );
  }, [order]);

  const handleDownloadFile = (file) => {
    downloadImage(file.url, file.name);
  };

  return (
    <>
      {order.status === OrderStatuses.Cancelled && <Result status="warning" title="Заказ был отменен" />}
      {order.status === OrderStatuses.Processed && (
        <Space direction="vertical">
          <Typography.Title level={2}>Содержимое заказа</Typography.Title>
          <Upload
            showUploadList={{ showRemoveIcon: false }}
            onPreview={handleDownloadFile}
            listType="picture-card"
            fileList={originalFiles}
          ></Upload>
          <Upload
            showUploadList={{ showRemoveIcon: false }}
            onPreview={handleDownloadFile}
            listType="picture-card"
            fileList={processedlFiles}
          ></Upload>
        </Space>
      )}
    </>
  );
};
