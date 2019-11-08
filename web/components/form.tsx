import styled, {css} from "styled-components";

const formControl = css`
  padding: 0.9em;
  margin-bottom: 10px;
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.theme.colors["primary"]};
  border-radius: ${props => props.theme.borderRadius}px;
`;

export const Input = styled.input`
  ${formControl}
`;

export const Select = styled.select`
  ${formControl}
`;


export const Form = styled.form`
  width: 100%;
`;