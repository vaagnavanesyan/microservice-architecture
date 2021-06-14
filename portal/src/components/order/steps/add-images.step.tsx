import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, Typography, Upload } from 'antd';
import { useEffect, useState } from 'react';

import { Order } from '../../../types/order';
import { OrderPosition } from '../../../types/order-position';
import { addImage, downloadImage, removeImage } from '../../../utils/api-requests';

export type AddImageStepProps = {
    order: Order;
    onRefreshOrder: () => void;
}


export const AddImageStep: React.FC<AddImageStepProps> = ({ order, onRefreshOrder }) => {
    const [fileList, setFileList] = useState([] as any);
    const [isUploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([] as OrderPosition[]);
    useEffect(() => {
        setUploadedFiles(order.positions);
    }, [order])

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
    const handleRemovePosition = (file) => {
        const index = uploadedFiles.findIndex(e => e.id.toString() === file.uid);
        console.log(index);
        const newList = uploadedFiles.slice();
        newList.splice(index, 1);
        setUploadedFiles(newList);
        removeImage(file.url);
    }

    const handleDownloadFile = file => {
        downloadImage(file.url, file.name)
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
        <Upload
            listType="picture-card"
            fileList={uploadedFiles.map(position => ({
                uid: position.id.toString(),
                name: position.originalImageName,
                url: position.originalImageUrl
            }))}
            onPreview={handleDownloadFile}
            onRemove={handleRemovePosition}
        >
        </Upload>
    </Space >
}