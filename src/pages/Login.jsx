import React from 'react';
import styled from 'styled-components';

export default function Login() {
  return <LoginWrapper>로그인</LoginWrapper>;
}

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65vh;
  padding: 1rem;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 0 0 1rem 1rem;
  overflow-y: scroll;
`;
