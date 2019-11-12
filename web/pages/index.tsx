import {NextPage, NextPageContext} from "next";
import React from "react";
import {Container, Section} from "../components/global-style";
import Layout from "../components/layout";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import {withApollo, WithApollo} from "../lib/apollo";

const Index: NextPage = () => {
  return (
    <Layout>
      <Section>
        <Container>
          <header>
            <h1 style={{color: "red"}}>INDEX</h1>
            {/* <Link href="/meeting-rooms"></Link> */}
          </header>
        </Container>
      </Section>
    </Layout>
  );
};

Index.getInitialProps = async (context: NextPageContext & WithApollo) => {
  const user = await checkLoggedIn(context.apolloClient);

  if (user === undefined) {
    redirect(context, '/signin');
  }

  return {user};
};

export default withApollo(Index);
