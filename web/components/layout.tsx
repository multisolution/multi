import React, { FunctionComponent, MouseEvent } from "react";
import { Container } from "./global-style";
import Header from "./header";
import styled from "styled-components";
import Footer from "./footer";
import { Align, Row } from "./grid";
import Link from "next/link";
import Button, { ButtonSkin } from "./button";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import redirect from "../lib/redirect";
import cookie from "cookie";

const ContainerHeader = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 670px) {
    flex-direction: column;
    padding: 10px 0;
  }
`;

const Main = styled.main`
  min-height: 100vh;
  min-height: -webkit-calc(100vh - 200px);
  min-height: -moz-calc(100vh - 200px);
  min-height: calc(100vh - 200px);
`;

const Layout: FunctionComponent = ({ children }) => {
  const apolloClient = useApolloClient();
  const [signOut] = useMutation<{ signOut: boolean }>(gql`
    mutation SignOut {
      signOut
    }
  `);

  async function onSignOutClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    signOut().then(result => console.info("Back-end sign out", result.data));
    document.cookie = cookie.serialize("token", "", { maxAge: -1 });
    await apolloClient.cache.reset();
    redirect(null, "/signin");
  }

  return (
    <>
      <Header>
        <ContainerHeader>
          <img src="/assets/img/logo.png" alt="MultisolutiON" />
          <Row mainAxis={Align.Center} crossAxis={Align.End}>
            <span>Usuário/Admin</span>

            {/* <Link href="/meeting-rooms">
              <Button skin={ButtonSkin.Text}>Calendario</Button>
            </Link>
            <Link href="/create-user">
              <Button skin={ButtonSkin.Text}>Cadastrar Usuário</Button>
            </Link>
            <Link href="/profile">
              <Button skin={ButtonSkin.Text}>Perfil</Button>
            </Link> */}

            <Button skin={ButtonSkin.Text} onClick={onSignOutClick}>
              Sair
            </Button>
          </Row>
        </ContainerHeader>
      </Header>

      <Main role="main">{children}</Main>
    </>
  );
};

export default Layout;
