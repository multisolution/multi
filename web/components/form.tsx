import styled, {css} from "styled-components";
import React, {FC} from "react";

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

const Unchecked = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 1px solid ${props => props.theme.colors.dark};
`;

const Checked = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.primary};
`;

export const Checkbox: FC<{ checked?: boolean, size?: number, onClick?: () => void }> = ({checked, size = 24, onClick}) => {
  return (
    <div onClick={() => onClick && onClick()} style={{cursor: 'pointer'}}>
      {checked ? <Checked size={size}/> : <Unchecked size={size}/>}
    </div>
  );
};
