import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeSwitch } from './Features/ThemeSwitch';
import { Masthead } from './Masthead';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="FaceSystems Portal homepage" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Masthead />
        <ThemeSwitch />
      </PageWrapper>
    </>
  );
}
