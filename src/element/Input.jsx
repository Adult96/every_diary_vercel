import React from 'react';
import styled from 'styled-components';

export default function Input({
  width,
  height,
  fontSize,
  placeholder,
  autoFocus,
  value,
  onChange,
  children,
}) {
  return (
    <InputContainer>
      {children}
      <InputElement
        width={width}
        height={height}
        fontSize={fontSize}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
      />
    </InputContainer>
  );
}

const InputContainer = styled.div``;

const InputElement = styled.input`
  width: ${props => props.width};
  height: ${props => props.height};
  padding: 1rem;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.bgBtnColor};
  border: none;
  outline: none;
  font-size: ${props => props.fontSize};
`;
