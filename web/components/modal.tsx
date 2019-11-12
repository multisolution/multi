import React, {FunctionComponent} from "react";
import styled, {css, keyframes} from "styled-components";
import {MdClose} from "react-icons/md";
import {Align, Row} from "./grid";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

type IsOpen = {
  isOpen: boolean;
};

const fullSize = css`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div<IsOpen>`
  ${fullSize};
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  ${fullSize};
  position: absolute;
`;

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(100%)",
    height: 0,
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
    height: "initial",
  },
});

const Container = styled.div<IsOpen>`
  padding: ${({theme}) => theme.space * 10}px;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12),
    0 11px 15px -7px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 40vw;
  animation: 400ms ease-out ${fadeIn};
`;

const CloseButton = styled.button`
  background: none;
  color: gray;
  outline: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Title = styled.h1`
  flex: 1;
  font-size: 1.8rem;
  color: ${props => props.theme.colors.dark};
`;

type ModalProps = {
  title: string;
  onClose: () => void;
};

const Modal: FunctionComponent<ModalProps & IsOpen> = ({title, isOpen, children, onClose}) => {
  return (
    <ReactCSSTransitionGroup transitionName={fadeIn.getName()}>
      <Wrapper isOpen={isOpen}>
        <Overlay onClick={_ => onClose()} />

        <Container isOpen={isOpen}>
          <Row
            mainAxis={Align.Center}
            decoration={css`
            margin-bottom: ${props => props.theme.space * 2}px;
          `}
          >
            <Title>{title}</Title>
            <CloseButton onClick={_ => onClose()}>
              <MdClose size={24}/>
            </CloseButton>
          </Row>
          {children}
        </Container>
      </Wrapper>
    </ReactCSSTransitionGroup>
  );
};

export default Modal;
