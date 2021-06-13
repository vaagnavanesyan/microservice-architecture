import { PlusOutlined } from '@ant-design/icons';
import { Button, Image, Space, Typography, Upload } from 'antd';
import { useState } from 'react';

import { Order } from '../../../types/order';
import { addImage } from '../../../utils/api-requests';

export type AddImageStepProps = {
    order: Order;
    onRefreshOrder: () => void;
}


export const AddImageStep: React.FC<AddImageStepProps> = ({ order, onRefreshOrder }) => {
    const [fileList, setFileList] = useState([] as any);
    const [isUploading, setUploading] = useState(false);

    const addFiles = ({ fileList }) => {
        setFileList(fileList);
    }
    const beforeUpload = (file: any) => {
        return false;
    }
    const handleUpload = async () => {
        setUploading(true);
        for (const file of fileList) {
            await addImage(order.id, file.originFileObj);
        }
        setUploading(false);
        setFileList([]);
        onRefreshOrder();

    }
    const onRemove = file => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    }
    return <Space direction="vertical">
        <Typography.Title level={2}>Добавление изображений в заказ</Typography.Title>
        <Upload
            disabled={isUploading}
            listType="picture-card"
            multiple
            fileList={fileList}
            onChange={addFiles}
            beforeUpload={beforeUpload}
            onRemove={onRemove}
        >
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Выберите файл...</div>
            </div>
        </Upload>
        <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={isUploading}
            style={{ marginTop: 16 }}
        >
            {isUploading ? 'Отправка...' : 'Загрузить'}
        </Button>
        <Typography.Title level={2}>Загруженные изображения:</Typography.Title>
        <Image.PreviewGroup>
            {order.positions.map(({ id, originalImage }) =>
                <Image
                    key={id}
                    width={200}
                    src={originalImage}
                />)}
        </Image.PreviewGroup>

    </Space>
}