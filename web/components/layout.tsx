import React, { FunctionComponent, PropsWithChildren } from "react";
import { Container } from "./global-style";
import Header from "./header";
import BoxHeader from "./box-header";
import styled from "styled-components"
import Footer from "./footer";
type LayoutProps = {};


const ContainerHeader = styled(Container)`

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 670px){
    flex-direction: column;
    padding: 10px 0;
  }
`

const Main = styled.main`
  min-height: 100vh;
  min-height: -webkit-calc(100vh - 200px);
  min-height: -moz-calc(100vh - 200px);
  min-height: calc(100vh - 200px);
`


const Layout: FunctionComponent = (props: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Header>
        <ContainerHeader >
          <img src="/logo.png" />

         <BoxHeader></BoxHeader>   

        </ContainerHeader>
      </Header>

      <Main role="main">{props.children}</Main>

      <Footer>FOOTER</Footer>
    </>
  );
};

export default Layout;
