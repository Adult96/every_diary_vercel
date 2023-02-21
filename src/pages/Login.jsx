import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../element/Button';
import Input from '../element/Input';
import { AiFillLock } from 'react-icons/ai';
import Valid from '../validation/inputValidation';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [signUp, setSignUp] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    if (signUp) {
      if (!Valid.formEmpty(id, pw, pwCheck)) {
        return alert('공백은 입력할 수 없습니다.');
      }
      if (!Valid.pwDifferentCheck(pw, pwCheck)) {
        return alert('비밀 번호를 다시 확인해 주세요.');
      }
    } else {
      if (!Valid.formEmpty(id, pw)) {
        return alert('공백은 입력할 수 없습니다.');
      }
    }
  };

  const handleSignUp = () => {
    setSignUp(v => !v);
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <Text>
          <AiFillLock />
        </Text>
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
          width='20rem'
          height='2.5rem'
          fontSize='1.3rem'
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder='PW'
        />
        {signUp && (
          <Input
            width='20rem'
            height='2.5rem'
            fontSize='1.3rem'
            value={pwCheck}
            onChange={e => setPwCheck(e.target.value)}
            placeholder='PW CHECK'
          />
        )}
        <ButtonContainer>
          <Button width='10rem' height='3rem'>
            Login
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

const Text = styled.h1``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
