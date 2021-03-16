import * as React from 'react';
import styled from 'styled-components/macro';

export function Masthead() {
  return (
    <Wrapper>
      <Image
        src={process.env.PUBLIC_URL + '/facialrecognition.jpg'}
        alt="Logo"
      />
    </Wrapper>
  );
}

const Image = styled.img`
  width: 100%;
`;

const Wrapper = styled.main`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
`;
