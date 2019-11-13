import { NextPage, NextPageContext } from "next";
import React from "react";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import { withApollo, WithApollo } from "../lib/apollo";
import { ApolloProvider, ApolloConsumer } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";

const Index: NextPage = () => {
  return <div />;
};

Index.getInitialProps = async (context: NextPageContext & WithApollo) => {
  const user = await checkLoggedIn(context.apolloClient);

  if (user === undefined) {
    redirect(context, "/signin");
  }

  redirect(context, "/meeting-rooms");

  return { user };
};

export default withApollo(Index);
