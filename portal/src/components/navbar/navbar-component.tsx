import { FileImageOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import './navbar-component.css';

export const NavBar = () => (
  <Menu theme="dark" mode="horizontal">
    <Menu.Item key="orders" icon={<FileImageOutlined />}>
      <a href="/orders">Orders</a>
    </Menu.Item>
    <Menu.SubMenu key="account" icon={<UserOutlined />} title="Account">
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <a href="/logout">Log out</a>
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
);
