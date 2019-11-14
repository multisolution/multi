import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { animated, useTransition } from "react-spring";


const Title = styled.h1`
  font-size: 1.8rem;
  color: #FFFF;
`;

const Alert = styled.div<{typeMenssage: string}>`
 width: 200px;
 height: 80px;
 box-shadow: 0px 0px 40px #999;
 position: fixed;
 bottom: 0;
 left: 0;
 width: 100%;
 text-align: center;
 display: flex;
 align-items: center;
 flex-direction: column;
 justify-content: center;
 background: ${props => props.typeMenssage == "success" && "#bad531" ||
                        props.typeMenssage == "error" && "red" };
 color: #FFF;


`

type AlertProps = {
    title: string;
    menssage?: string;
    typeMenssage: string;
    isOpen?: boolean;
};

const AlertMenssage: FunctionComponent<AlertProps> = ({ title, menssage, children, typeMenssage, isOpen }) => {

  const transition = useTransition(isOpen, null, {
    from: { transform: "translate3d(0,25vh,0)", opacity: 0, outline: "20px solid red" },
    enter: { transform: "translate3d(0,0vh,0)", opacity: 1, outline: "20px solid blue"},
    leave: { transform: "translate3d(0,-25vh,0)", opacity: 0, outline: "20px solid green" },
    config: { duration: 3000 }
  });

  return (
    <>
 {transition.map(
        ({ item, key, props }) =>
          item && (
          <Alert typeMenssage={typeMenssage} key={key} style={props}>
            <Title>{title}</Title>
            <p>{menssage}</p>
              {children}
          </Alert>
          )
      )}
    </>

  );
};

export default AlertMenssage;
