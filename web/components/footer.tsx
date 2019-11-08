import React from "react";
import styled from "styled-components";

type FooterProps = {
  bgdiferentao?: string;
};

const Footer = styled.footer<FooterProps>`
  width: 100%;
  height: 100px;
  display: flex;
  color: #FFF;
  justify-content: center;
  background: #000;
  color: "${props => (props.bgdiferentao ? props.bgdiferentao : "white")};"
`;

export default Footer;
