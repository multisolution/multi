import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

export type Theme = {
    borderRadius: string,
    colors: {
        primary: string,
        transparent: string
    }
}

export const theme: Theme = {
    borderRadius: '4px',
    colors: {
      primary: '#bad531',
      transparent: 'transparent',
    }
  };

//   props.theme.colors.primary 

export default createGlobalStyle`


@import url('https://fonts.googleapis.com/css?family=PT+Sans:400,700&display=swap');
  * {
    box-sizing: border-box;
    transition: all 200ms;
    margin: 0; padding: 0;
    font-family: 'PT Sans', sans-serif;
    font-size: 14px;
  }
  html, body, #__next { height: 100%; }


body{
    min-height:100%;
    background: #FFF; 
    font-size:14px;
}
 
`
type ContentProps = {
    article: boolean
}

export const Section = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    outline: 1px solid #000;

    /* @media screen and (max-width: 1000px){
    outline: 1px solid red;

    } */
` 


export const Article = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    outline: 1px solid #000;
` 


export const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    outline: 1px solid #000;
` 


export const Container = styled.div`
    max-width: 1280px;
    width: 100%;
    padding: 0 15px;
    outline: 1px solid #000 ;
`
 