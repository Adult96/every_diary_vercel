import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../element/Button';
import Input from '../element/Input';
import { AiFillLock } from 'react-icons/ai';
import { HiOutlineUserAdd } from 'react-icons/hi';

import Valid from '../validation/inputValidation';
import ALERT from '../constants/alert';

import { useDispatch } from 'react-redux';
import {
  __postLogin,
  __postSignIn,
} from '../utils/redux/module/login/loginPostSlice';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';
import { __getLogin } from '../utils/redux/module/login/loginGetSlice';

import QUERY from '../constants/query';
import ROUTER from '../constants/router';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [signUp, setSignUp] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if (signUp) {
      if (!Valid.formEmpty(id, pw, pwCheck)) {
        return alert(ALERT.CHECK_EMPTY);
      }
      if (!Valid.pwDifferentCheck(pw, pwCheck)) {
        return alert(ALERT.CHECK_DIFF_PW);
      }
    } else {
      if (!Valid.formEmpty(id, pw)) {
        return alert(ALERT.CHECK_EMPTY);
      }
    }

    loginProcess();
  };

  const handleSignUp = () => {
    resetLoginInput();
    setSignUp(v => !v);
  };

  const loginProcess = async () => {
    await loginDispatch();

    const token = getCookie(QUERY.COOKIE.COOKIE_NAME);
    token && (await getAuthorization(token));
    token && navigate(ROUTER.PATH.CALENDAR);
  };

  const loginDispatch = async () => {
    const loginData = { id: id, password: pw };

    if (signUp) {
      await dispatch(__postSignIn(loginData));
      resetLoginInput();
      setSignUp(false);
    } else {
      await dispatch(__postLogin(loginData));
      resetLoginInput();
    }
  };

  const getAuthorization = async token => {
    await dispatch(__getLogin(token));
  };

  const resetLoginInput = () => {
    setId('');
    setPw('');
    setPwCheck('');
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <h1>{signUp ? <HiOutlineUserAdd /> : <AiFillLock />}</h1>
        <Input
          name='id'
          width='20rem'
          height='2.5rem'
          fontSize='1.3rem'
          placeholder='ID'
          value={id}
          onChange={e => setId(e.target.value)}
          autoFocus={true}
        />
        <Input
          type={showPw ? 'text' : 'password'}
          width='20rem'
          height='2.5rem'
          fontSize='1.3rem'
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder='PW'
        />
        {signUp && (
          <Input
            type={showPw ? 'text' : 'password'}
            width='20rem'
            height='2.5rem'
            fontSize='1.3rem'
            value={pwCheck}
            onChange={e => setPwCheck(e.target.value)}
            placeholder='PW CHECK'
          />
        )}
        <ShowPasswordContainer>
          <Input
            type='checkbox'
            onChange={e => {
              setShowPw(e.target.checked);
            }}
          />
          <span>Show Password</span>
        </ShowPasswordContainer>
        <ButtonContainer>
          <Button width='10rem' height='3rem'>
            {signUp ? 'Enter' : 'Login'}
          </Button>
          <Button
            width='10rem'
            height='3rem'
            type='button'
            click={handleSignUp}
          >
            {signUp ? 'back' : 'SignUp'}
          </Button>
        </ButtonContainer>
      </LoginForm>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65vh;
  padding: 1rem;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 0 0 1rem 1rem;
  gap: 1rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;

const ShowPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
