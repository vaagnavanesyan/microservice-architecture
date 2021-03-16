import { FormLabel } from 'app/components/FormLabel';
import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import React, { SyntheticEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
export function SignIn() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(login, password);
    fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    })
      .then(r => r.json())
      .then(console.log);
  };

  return (
    <>
      <Helmet>
        <title>Sign in</title>
        <meta name="description" content="FaceSystems Portal Sign In Page" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="login">Login: </FormLabel>
          <p>
            <input
              type="text"
              id="login"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </p>
          <FormLabel htmlFor="password">Password: </FormLabel>
          <p>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </p>
          <input type="submit" value="Login" />
        </form>
      </PageWrapper>
    </>
  );
}

// const Form = styled.form``
