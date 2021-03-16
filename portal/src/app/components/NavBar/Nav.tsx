import * as React from 'react';
import { BsFillPersonFill, BsFillPersonPlusFill } from 'react-icons/bs';
import styled from 'styled-components/macro';

export function Nav() {
  return (
    <Wrapper>
      <Item href="/signin" title="Sign In">
        <BsFillPersonFill className="icon" />
        Sign In
      </Item>
      <Item href="/signup" title="Sign Up">
        <BsFillPersonPlusFill className="icon" />
        Sign Up
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled.a`
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
