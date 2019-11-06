import styled from "styled-components";
import { darken } from "polished";

type Props = {
  skin: string;
  colorText?: string;
};

const Button = styled.button<Props>`
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
  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    background: ${props => darken(0.1, props.theme.colors[props.skin])};
  }
`;

export default Button;
