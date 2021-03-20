import { FormLabel } from 'app/components/FormLabel';
import { PageWrapper } from 'app/components/PageWrapper';
import React, { SyntheticEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { signIn } from 'utils/api-request';
export function SignIn() {
  const history = useHistory();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    signIn(login, password).then(accessToken => {
      if (accessToken) {
        history.push('/profile');
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Sign in</title>
        <meta name="description" content="FaceSystems Portal Sign In Page" />
      </Helmet>
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
