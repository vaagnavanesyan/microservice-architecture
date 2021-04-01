import { FormLabel } from 'app/components/FormLabel';
import { PageWrapper } from 'app/components/PageWrapper';
import React, { SyntheticEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { signIn } from 'utils/api-request';
export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    signIn(email, password).then(accessToken => {
      if (accessToken) {
        window.location.href = '/profile';
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
          <FormLabel htmlFor="email">Email: </FormLabel>
          <p>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
