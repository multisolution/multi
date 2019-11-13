import React, {FunctionComponent} from "react";
import styled, {css} from "styled-components";
import {MdClose} from "react-icons/md";
import {Align, Row} from "./grid";
import {animated, useTransition} from "react-spring";

const fullSize = css`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(animated.div)`
  ${fullSize};
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Overlay = styled.div`
  ${fullSize};
  position: absolute;
`;

const Container = styled.div`
  padding: ${({theme}) => theme.space * 10}px;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12),
    0 11px 15px -7px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 40vw;

  @media screen and (max-width: 1100px){

    min-width: 60vw;

  }


  @media screen and (max-width: 700px){

    min-width: 95vw;

  }
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
  isOpen: boolean;
};

const Modal: FunctionComponent<ModalProps> = ({title, isOpen, children, onClose}) => {
  const transition = useTransition(isOpen, null, {
    from: {transform: 'translate3d(0,25vh,0)', opacity: 0},
    enter: {transform: 'translate3d(0,0vh,0)', opacity: 1},
    leave: {transform: 'translate3d(0,-25vh,0)', opacity: 0},
    config: {duration: 240},
  });

  return (
    <>
      {transition.map(
        ({item, key, props}) =>
          item && (
            <Wrapper key={key} style={props}>
              <Overlay onClick={_ => onClose()}/>
              <Container>
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
          )
      )}
    </>
  );
};

export default Modal;
