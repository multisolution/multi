import React, { FunctionComponent, MouseEvent } from "react";
import { Container } from "./global-style";
import Header from "./header";
import styled from "styled-components";
import { useApolloClient, useMutation, useQuery, ApolloConsumer } from "@apollo/react-hooks";
import gql from "graphql-tag";
import redirect from "../lib/redirect";
import cookie from "cookie";
import { Role } from "../lib/models";
import { withApollo } from "../lib/apollo";
import Menu from "./menu";
import ApolloClient from "apollo-client";

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

const Layout: FunctionComponent = () => {
  return (
    <>
      <Header>
        <ContainerHeader>
          <img src="/assets/img/logo.png" alt="MultisolutiON" />
          <Menu />
        </ContainerHeader>
      </Header>
    </>
  );
};

export default withApollo(Layout);
