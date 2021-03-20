/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from '../styles/global-styles';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { SignIn } from './pages/SignIn/Loadable';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Helmet
        titleTemplate="%s - Face Systems"
        defaultTitle="Face Systems"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Face Systems Portal" />
      </Helmet>
        <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signin" component={SignIn}></Route>
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
