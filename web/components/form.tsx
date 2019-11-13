import styled, {css} from "styled-components";

const formControl = css`
  padding: 1rem;
  width: 100%;
  border: 1px solid ${props => props.theme.colors["primary"]};
  border-radius: ${props => props.theme.borderRadius}px;
  outline: none;
  
  &:hover, &:active, &:focus {
    box-shadow: 0px 2px 0px 0px ${props => props.theme.colors["primary"]}; 
  }
`;

export const Input = styled.input`
  ${formControl}
`;

export const Select = styled.select`
  ${formControl}
  
  option {
    padding: 8px;
  }
`;
