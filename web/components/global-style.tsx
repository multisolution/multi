import styled, {createGlobalStyle, css} from "styled-components";

export type Theme = {
  borderRadius: number;
  space: number;
  colors: {
    [name: string]: string;
  };
};

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export const roomColorsPallete = {
  room1: "#0E7C7B",
  room2: "#984447",
  room3: "#FFBA08",
  room4: "#3F88C5",
  room5: "#032B43",
  room6: "#541388"
};

export const theme: Theme = {
  borderRadius: 2,
  space: 4,
  colors: {
    primary: "#bad531",
    dark: "#808080",
    transparent: "transparent",
    white: "#ffffff",
    black: "#222222",
    error: "#f20000"
  }
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=PT+Sans:400,700&display=swap');

  * {
    box-sizing: border-box;
    transition: all 240ms;
    margin: 0; padding: 0;
    font-family: 'PT Sans', sans-serif;
    font-size: 14px;
  }
  
  html, body, #__next { height: 100%; }
`;

const blockCss = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  display: ${props => (props.display ? props.display : "block")};
  align-items: ${props => (props.alignItems ? props.alignItems : "")};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : "")};
  max-width: 1280px;
  width: ${props => (props.width ? props.width : "100%")};
  height: ${props => (props.height ? props.height : "")};
  padding: 0 15px;
  margin: ${props => (props.margin ? props.margin + "px" : "0px")};
  background-image: url(${props => (props.bgImage ? props.bgImage : "")});
  background-repeat: no-repeat;
  background-color: ${props => (props.bgColor ? props.bgColor : "transparent")};
`;

export const ListElement = styled.div`
  border-radius: ${props => props.theme.borderRadius};
  display: "flex";
  align-items: "flex-start";
  justify-content: "flex-start";
  padding: 10px 15px;
  min-width: 150px;
  margin-left: 10px;
`;

type RoomProps = {
  bgColor: string;
};

export const Room = styled.div<RoomProps>`
  border-radius: ${props => props.theme.borderRadius};
  width: 200px;
  height: 200px;
  background-color: ${props => props.bgColor};
  margin-left: 150px;
`;


export const TitlePage = styled.h1`

font-size: 30px;
text-transform: uppercase;
padding: 10px 0;

`

export default TitlePage


export default GlobalStyle;
