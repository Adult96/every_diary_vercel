import React from 'react';
import styled, { css } from 'styled-components';

export default function Button({
  width,
  height,
  fontSize,
  type,
  mode,
  click,
  children,
}) {
  return (
    <Btn
      width={width}
      height={height}
      fontSize={fontSize}
      type={type}
      mode={mode}
      onClick={click}
    >
      {children}
    </Btn>
  );
}

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.bgBtnColor};
  /* border: 1px solid ${props => props.theme.borderColor}; */
  border: none;
  border-radius: 1rem;
  outline: none;
  font-size: ${props => props.fontSize};
  cursor: pointer;
  ${props =>
    props.mode &&
    css`
      transform: translateX(6.1vw);
    `};
`;
