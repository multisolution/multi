import styled from "styled-components";
import {darken} from "polished";
import React, {ButtonHTMLAttributes, FunctionComponent} from "react";

type StyledButtonProps = {
  skin: string;
  colorText?: string;
  loading?: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  cursor: pointer;
  background: ${props => props.theme.colors[props.skin]};
  color: ${props => (props.colorText ? props.theme.colors[props.colorText] : "white")};
  border: none;
  min-height: 48px;
  padding: 0 ${props => props.theme.space * 4}px;
  border-radius: ${props => props.theme.borderRadius}px;
  text-transform: uppercase;
  font-weight: bold;
  width: 100%;
  opacity: ${props => props.loading ? '0.8' : '1'};
  
  &:focus,
  &:active,
  &:hover {
    outline: none;
    background: ${props => darken(0.1, props.theme.colors[props.skin])};
  }
`;

type ButtonProps = {
  loading?: boolean;
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & StyledButtonProps & ButtonProps;

const Button: FunctionComponent<Props> = (props) => {
  const {loading = false, children} = props;

  return (
    <StyledButton {...props}>
      {loading ? 'Carregando...' : children}
    </StyledButton>
  )
};

export default Button;
