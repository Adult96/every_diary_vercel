import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import QUERY from '../constants/query';
import ROUTER from '../constants/router';
import Button from '../element/Button';
import { removeCookie } from '../utils/cookie';

export default function LogOut() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeCookie(QUERY.COOKIE.COOKIE_NAME);
    navigate(ROUTER.PATH.SLASH);
  };
  return (
    <LogOutContainer>
      <Button width='5rem' height='2rem' click={handleLogOut}>
        Log out
      </Button>
    </LogOutContainer>
  );
}

const LogOutContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
`;
