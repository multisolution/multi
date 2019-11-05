import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { NextPage } from "next";
import React from "react";
import Button from "../components/button";
import { Container, Section } from "../components/global-style";
import Layout from "../components/layout";
import gql from "graphql-tag";
import cookie from "cookie";
import redirect from "../lib/redirect";
import { withApollo } from "../lib/apollo";

const Signin: NextPage = () => {
  const [sigin] = useMutation(gql`
    mutation Siginin($email: String = "multi@multisolution.art.br", $password: String = "multi") {
      signIn(email: $email, password: $password)
    }
  `);

  const appoloClient = useApolloClient();

  return (
    <>
      <Layout>
        <Section>
          <Container>
            <Button skin="primary" onClick={onSignInClick}>
              Entrar
            </Button>
          </Container>
        </Section>
      </Layout>
    </>
  );

  async function onSignInClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      const result = await sigin({});

      if (result.data && result.data.signIn) {
        document.cookie = cookie.serialize("token", result.data.signIn);
        console.log(document.cookie);
        await appoloClient.cache.reset();
        redirect(null, "/signup");
      }

      console.log(result);
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    }
  }
};

export default withApollo(Signin);
