import { Button, Empty, Layout, Result } from 'antd';
import React from 'react';
import './App.css';
import { Footer } from './components/footer/footer-component';
import { Login } from './components/login/login-component';
import { NavBar } from './components/navbar/navbar-component';
import { Orders } from './components/orders/orders-component';

const App = () => (
  <>
    <Layout>
      <Layout.Header className="header">
        <NavBar />
      </Layout.Header>
      <Layout.Content className="content">
        <Login />
        <hr />
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={<span>You don't have orders yet</span>}
        >
          <Button type="primary">Make first order</Button>
        </Empty>
        <hr />
        <Orders />
        <hr />
        <Result
          status="success"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console">
              Go Console
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        />
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  </>
);

export default App;
