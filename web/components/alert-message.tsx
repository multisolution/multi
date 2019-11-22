import React, {FunctionComponent} from "react";
import styled from "styled-components";
import {animated, useTransition} from "react-spring";

const Title = styled.h1`
  font-size: 1.8rem;
  color: #ffff;
`;

const Alert = styled(animated.div)<{ messageType: string }>`
  height: 80px;
  box-shadow: 0 0 40px #999;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: ${props =>
  (props.messageType == "success" && props.theme.colors.primary) ||
  (props.messageType == "error" && props.theme.colors.error)};
  color: #fff;
`;

type AlertProps = {
  title: string;
  message?: string;
  messageType: string;
  isOpen?: boolean;
};

const AlertMessage: FunctionComponent<AlertProps> = ({title, message, children, messageType, isOpen}) => {
  const transition = useTransition(isOpen, null, {
    from: {transform: "translate3d(0,25vh,0)", opacity: 0},
    enter: {transform: "translate3d(0,0vh,0)", opacity: 1},
    trail: 2500,
    leave: {transform: "translate3d(0,25vh,0)", opacity: 0},
    config: {duration: 500}
  });

  return (
    <>
      {transition.map(
        ({item, key, props}) =>
          item && (
            <Alert messageType={messageType} key={key} style={props}>
              <Title>{title}</Title>
              <p>{message}</p>
              {children}
            </Alert>
          )
      )}
    </>
  );
};

export default AlertMessage;
