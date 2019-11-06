import styled from "styled-components";

const Input = styled.input`
  padding: 0.9em;
  margin-bottom: 10px;
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.theme.colors["primary"]};
  border-radius: ${props => props.theme.borderRadius}px;
`;

export default Input;
