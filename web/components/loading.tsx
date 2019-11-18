import React, {FunctionComponent} from "react";
import styled, {keyframes} from "styled-components";

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Loading: FunctionComponent = () => {
  return <StyledLoading>Carregando...</StyledLoading>;
};

const placeholderAnimation = keyframes({
  from: {
    transform: "translate3d(-30%, 0, 0)"
  },
  to: {
    transform: "translate3d(30%, 0, 0)"
  }
});

export const PlaceholderLoading = styled.div<{ height: number, width: number }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  background: ${props => props.theme.colors.light};
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  border-radius: ${props => props.theme.borderRadius}px;

  &::before {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 50%;
    z-index: 1;
    width: 500%;
    margin-left: -250%;
    animation: ${placeholderAnimation} 0.8s linear infinite;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 46%,
        rgba(255, 255, 255, 0.35) 50%,
        rgba(255, 255, 255, 0) 54%
      )
      50% 50%;
  }
`;

export default Loading;
