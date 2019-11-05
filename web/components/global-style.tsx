import styled, { createGlobalStyle, css } from "styled-components";

export type Theme = {
  borderRadius: number;
  space: number;
  colors: {
    primary: string;
    transparent: string;
    dark: string;
  };
};

export const theme: Theme = {
  borderRadius: 5,
  space: 4,
  colors: {
    primary: "#bad531",
    dark: "#808080",
    transparent: "transparent"
  }
};

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=PT+Sans:400,700&display=swap');
  * {
    box-sizing: border-box;
    transition: all 200ms;
    margin: 0; padding: 0;
    font-family: 'PT Sans', sans-serif;
    font-size: 14px;
  }
  
  html, body, #__next { height: 100%; }
`;

const blockCss = css`
  width: 100%;
  display: flex;
  justify-content: center;
  outline: 1px solid #000;
`;

export const Section = styled.section`
  ${blockCss}
`;

export const Article = styled.article`
  ${blockCss}
`;

export const Content = styled.div`
  ${blockCss}
`;

type ContainerProps = {
  bgImage?: string;
  height?: string;
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  bgColor?: string;
  margin?: string;
  border?: boolean;
};

export const Container = styled.div<ContainerProps>`
  border-radius: ${props => (props.border ? props.theme.borderRadius : "0")}px;
  display: ${props => (props.display ? props.display : "block")}
  align-items: ${props => (props.alignItems ? props.alignItems : "")}
  justify-content: ${props => (props.justifyContent ? props.justifyContent : "")};
  max-width: 1280px;
  width: ${props => (props.width ? props.width : "100%")};
  height: ${props => (props.height ? props.height + "px" : "")}
  padding: 0 15px;
  margin:${props => (props.margin ? props.margin + "px" : "0px")}
  background-image: url(${props => (props.bgImage ? props.bgImage : "")});
  background-repeat: no-repeat;
  background-color:${props => (props.bgColor ? props.bgColor : "transparent")}
`;

export default GlobalStyle;
