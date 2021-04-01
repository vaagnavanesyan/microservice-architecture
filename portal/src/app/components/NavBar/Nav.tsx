import Dropdown from 'rc-dropdown';
import React, { useEffect, useState } from 'react';
import { BiExit, BiUser, BiUserPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { getProfile, isAuthorized, signOut } from 'utils/api-request';
const initialState = {
  email: '',
};

export function Nav() {
  const [{ email }, setProfile] = useState(initialState);
  useEffect(() => {
    getProfile().then(setProfile);
  }, []);
  const isSignedIn = isAuthorized();

  const handleSignOut = () => {
    signOut();
    window.location.reload();
  };
  const userMenu = (
    <>
      <Item to={process.env.PUBLIC_URL + '/profile'}>
        <BiUser className="icon" />
        Profile
      </Item>
      <Item to="#" onClick={handleSignOut}>
        <BiExit className="icon" />
        Sign Out
      </Item>
    </>
  );
  const guestMenu = (
    <>
      <Item to={process.env.PUBLIC_URL + '/signin'}>
        <BiUser className="icon" />
        Sign In
      </Item>
      <Item to={process.env.PUBLIC_URL + '/signup'}>
        <BiUserPlus className="icon" />
        Sign Up
      </Item>
    </>
  );

  return (
    <Wrapper>
      <Dropdown
        trigger={['click']}
        animation="slide-up"
        overlay={isSignedIn ? userMenu : guestMenu}
      >
        <Item to="#">
          <BiUser className="icon" />
          {isSignedIn ? email : 'Profile'}
        </Item>
      </Dropdown>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled(Link)`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
