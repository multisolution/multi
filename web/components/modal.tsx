import React, {FunctionComponent} from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: ${({theme}) => theme.space}px;
  background: white;
  border-radius: ${({theme}) => theme.borderRadius}px;
`

const Modal: FunctionComponent = ({children}) => {
  return (
    <StyledModal>
      <Container>{children}</Container>
    </StyledModal>
  );
};

export default Modal;
