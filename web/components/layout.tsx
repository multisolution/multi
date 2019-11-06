import React, { FunctionComponent, PropsWithChildren } from "react";
import { Container } from "./global-style";
import Header from "./header";

type LayoutProps = {};

const Layout: FunctionComponent = (props: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Header>
        <Container>
          <h1>HEADER</h1>
        </Container>
      </Header>

      <main role="main">{props.children}</main>

      <footer>MULTI</footer>
    </>
  );
};

export default Layout;
