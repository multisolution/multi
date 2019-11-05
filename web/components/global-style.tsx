import styled, {createGlobalStyle, css} from "styled-components";

export type Theme = {
  borderRadius: number;
  space: number;
  colors: {
    primary: string;
    transparent: string;
  };
};

export const theme: Theme = {
  borderRadius: 2,
  space: 4,
  colors: {
    primary: "#bad531",
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

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  padding: 0 15px;
  outline: 1px solid #000;
`;

export default GlobalStyle;
