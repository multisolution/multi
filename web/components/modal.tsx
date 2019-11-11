import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

type WrapperProps = {
  isOpen: boolean;
};

const fullSize = css`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div<WrapperProps>`
  ${fullSize}
  position: fixed;
  display: ${({ isOpen = false }) => (isOpen ? "flex" : "none")};
  opacity: ${({ isOpen = false }) => (isOpen ? "1" : "0")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  ${fullSize}
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  padding: ${({ theme }) => theme.space * 4}px;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 8px #0000002e;
  z-index: 1;
`;

const CloseButton = styled.button`
  background: none;
  color: gray;
  outline: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
`;

type ModalProps = {
  onClose: () => void;
};

const Modal: FunctionComponent<ModalProps & WrapperProps> = ({ isOpen, children, onClose }) => {
  return (
    <Wrapper isOpen={isOpen}>
      <Overlay onClick={_ => onClose()} />
      <Container>
        <CloseButton onClick={_ => onClose()}>x</CloseButton>
        {children}
      </Container>
    </Wrapper>
  );
};

export default Modal;
