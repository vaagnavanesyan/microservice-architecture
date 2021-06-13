import { Alert, Button, Form, Input, Space, Spin } from 'antd';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signIn } from '../../utils/api-requests';
const tailLayout = {
  wrapperCol: { offset: 12 },
};
export const Login = () => {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const onFinish = async (values: any) => {
    setLoading(true);
    const { email, password } = values;
    const token = await signIn(email, password);
    setLoading(false);
    if (!token) {
      setShowError(true);
    }
    history.push('/');
  };

  return (
    <Space direction="vertical">
      {showError && <Alert message="Login failed" type="error" showIcon />}
      <Form className="form" onFinish={onFinish}>
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
