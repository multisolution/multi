import { NextPage, NextPageContext } from "next";
import React from "react";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import { withApollo, WithApollo } from "../lib/apollo";

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
