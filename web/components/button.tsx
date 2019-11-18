import styled from "styled-components";
import {darken} from "polished";
import React, {ButtonHTMLAttributes, FunctionComponent} from "react";

export enum ButtonSkin {
  Primary,
  Text
}

type StyledButtonProps = {
  skin?: ButtonSkin;
  colorText?: string;
  isLoading?: boolean;
};

type ButtonSkinProps = {
  background: string;
  color: string;
  hoverColor: string;
  padding: number;
};

const buttonSkins: { [name: number]: ButtonSkinProps } = {
  [ButtonSkin.Primary]: {
    background: "primary",
    color: "white",
    hoverColor: "white",
    padding: 4
  },
  [ButtonSkin.Text]: {
    background: "transparent",
    color: "black",
    hoverColor: "primary",
    padding: 0
  }
};

const StyledButton = styled.button<StyledButtonProps>`
  cursor: pointer;
  background: ${({ skin = ButtonSkin.Primary, theme }) => theme.colors[buttonSkins[skin].background]};
  color: ${({ skin = ButtonSkin.Primary, theme }) => theme.colors[buttonSkins[skin].color]};
  border: none;
  min-height: 48px;
  padding: 0 ${({skin = ButtonSkin.Primary, theme}) => `${buttonSkins[skin].padding * theme.space}px`};
  border-radius: ${props => props.theme.borderRadius}px;
  text-transform: uppercase;
  font-weight: bold;
  opacity: ${props => (props.isLoading ? "0.5" : "1")};

  &:focus,
  &:active,
  &:hover {
    outline: none;
    background: ${({ skin = ButtonSkin.Primary, theme }) => darken(0.1, theme.colors[buttonSkins[skin].background])};
    color: ${({ skin = ButtonSkin.Primary, theme }) => theme.colors[buttonSkins[skin].hoverColor]};
  }
`;

type ButtonProps = {
  isLoading?: boolean;
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & StyledButtonProps & ButtonProps;

const Button: FunctionComponent<Props> = props => {
  const {isLoading, children} = props;

  return <StyledButton {...props}>{isLoading ? "Carregando..." : children}</StyledButton>;
};

export default Button;
