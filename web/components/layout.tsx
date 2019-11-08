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

      <main role="main">{props.children}</main>

      <Footer>FOOTER</Footer>
    </>
  );
};

export default Layout;
