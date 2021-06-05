import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Footer } from './components/footer/footer-component';
import { Login } from './components/login/login-component';
import { NavBar } from './components/navbar/navbar-component';
import { OrdersEmptyList } from './components/orders/empty/orders-empty.component';
import { Orders } from './components/orders/orders-component';
import { SuccessMessage } from './components/success/success-component';

const App = () => {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Layout>
          <Layout.Header className="header">
            <NavBar />
          </Layout.Header>
          <Layout.Content className="content">
            <Switch>
              {/* TODO: Change to real home page*/}
              <Route exact path="/" component={SuccessMessage} />
              <Route path="/signin" component={Login}></Route>
              <PrivateRoute path="/orders">
                <Orders />
              </PrivateRoute>
              {/* TODO: Not found page here */}
              <Route component={OrdersEmptyList} />
            </Switch>
          </Layout.Content>
          <Footer />
        </Layout>
      </BrowserRouter>
    </>
  );
};

function PrivateRoute({ children, ...rest }) {
  let auth = true; //isAuthorized();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
