import './navbar-component.css';

import { BellOutlined, DollarOutlined, FileImageOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';

import {
  addAmount,
  getAmount,
  getNotifications,
  getProfile,
  isAuthorized,
  markNotificationsAsRead,
  signOut,
} from '../../utils/api-requests';

export const NavBar = () => {
  const [fullName, setFullName] = useState('');
  const [amount, setAmount] = useState(0.0);
  const [notifications, setNotifications] = useState([] as any);

  useEffect(() => {
    if (isAuthorized()) {
      getNotifications().then((notifications) =>
        setNotifications(notifications.map((e) => ({ message: e.message, id: e.id })))
      );
    }
  }, []);
  useEffect(() => {
    getProfile().then((profile) =>
      profile ? setFullName(`${profile.firstName} ${profile.lastName}`) : setFullName('Unauthorized User')
    );
    getAmount().then(setAmount);
  }, []);

  const handleAddAmount = async () => {
    await addAmount();
    setAmount(amount + 5);
  };
  const handleMarkAllAsRead = async () => {
    const lastNotification = notifications.slice(-1).pop();
    await markNotificationsAsRead(lastNotification.id);
    getNotifications().then((notifications) =>
      setNotifications(notifications.map((e) => ({ message: e.message, id: e.id })))
    );
  };
  const handleLogout = () => {
    signOut();
  };
  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="orders" icon={<FileImageOutlined />}>
        <a href="/orders">Orders</a>
      </Menu.Item>
      <Menu.SubMenu key="account" icon={<UserOutlined />} title={fullName}>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <a href="/profile">Edit profile</a>
        </Menu.Item>
        <Menu.Item key="amount" icon={<DollarOutlined />} onClick={handleAddAmount}>
          {amount}
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
          Выход
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="notifications" icon={<BellOutlined />} title={notifications.length || ''}>
        {notifications.map((notification) => (
          <Menu.Item key={notification.id}>{notification.message}</Menu.Item>
        ))}
        {notifications.length > 0 && (
          <Menu.Item key="mark-as-read" onClick={handleMarkAllAsRead}>
            Отметить прочитанным
          </Menu.Item>
        )}
      </Menu.SubMenu>
    </Menu>
  );
};
