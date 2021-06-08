import { Alert, Button, Form, Input, Space, Spin } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../../utils/api-requests';
const tailLayout = {
  wrapperCol: { offset: 12 },
};
export const SignUp = () => {
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const onFinish = async (values: any) => {
    setLoading(true);
    const token = await signUp(values);
    setLoading(false);
    if (!token) {
      setShowError(true);
    }
    console.log('token :>> ', token);
  };

  return (
    <Space direction="vertical">
      {showError && <Alert message="Login failed" type="error" showIcon />}
      <Form className="form" onFinish={onFinish}>
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Last name" name="lastName" rules={[{ required: true, message: 'Please input last name!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input email!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="I want to be admin 😏" name="isAdmin" valuePropName="checked">
          <Checkbox />
        </Form.Item>

        <Form.Item {...tailLayout}>
          {isLoading ? (
            <Spin />
          ) : (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
      <Link to="/signup">I don't have an account</Link>
    </Space>
  );
};
