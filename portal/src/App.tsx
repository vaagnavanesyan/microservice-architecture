import { Layout } from 'antd';
import React from 'react';
import './App.css';
import { Footer } from './components/footer/footer-component';
import { Login } from './components/login/login-component';
import { NavBar } from './components/navbar/navbar-component';

const App = () => (
  <>
    <Layout>
      <Layout.Header className="header">
        <NavBar />
      </Layout.Header>
      <Layout.Content className="content">
        <Login />
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  </>
);

export default App;
