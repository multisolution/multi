import React from "react";
import styled from "styled-components";

type HeaderProps = {
  bgdiferentao?: string;
};

const Header = styled.header<HeaderProps>`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  background: #fff;
  color: "${props => (props.bgdiferentao ? props.bgdiferentao : "white")};"
`;

export default Header;
