import { DollarOutlined, FileImageOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAmount, getProfile } from '../../utils/api-requests';
import './navbar-component.css';

export const NavBar = () => {
  const [fullName, setFullName] = useState('');
  const [amount, setAmount] = useState(0.0);
  useEffect(() => {
    getProfile().then((profile) =>
      profile ? setFullName(`${profile.firstName} ${profile.lastName}`) : setFullName('Unauthorized User')
    );
    getAmount().then(setAmount);
  }, []);
  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="orders" icon={<FileImageOutlined />}>
        <a href="/orders">Orders</a>
      </Menu.Item>
      <Menu.SubMenu key="account" icon={<UserOutlined />} title={fullName}>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <a href="/profile">Edit profile</a>
        </Menu.Item>
        <Menu.Item key="amount" icon={<DollarOutlined />}>
          {amount}
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <a href="/logout">Log out</a>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};
