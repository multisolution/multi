import styled from "styled-components";
import { darken } from "polished";

type Props = {
  skin: string;
};

const Input = styled.input<Props>`
  cursor: pointer;
  background: ${props => props.theme.colors[props.skin]};
  color: black;
  border: none;
  min-height: 48px;
  padding: 0 ${props => props.theme.space * 4}px;
  border-radius: ${props => props.theme.borderRadius}px;
  text-transform: uppercase;
  font-weight: bold;

  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    background: ${props => darken(0.1, props.theme.colors[props.skin])};
  }
`;

export default Input;
