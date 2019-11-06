import { NextPage } from "next";
import React from "react";
import { withApollo } from "../lib/apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../components/layout";
import { Section } from "../components/global-style";
import { Container } from "next/app";

const ListUsers: NextPage = () => {
  const getUsers = useQuery(
    gql`
      query AllUsers {
        allUsers {
          id
          email
        }
      }
    `
  );

  return (
    <>
      <Layout>
        <Section>
          <Container>{renderUsers()}</Container>
        </Section>
      </Layout>
    </>
  );

  function renderUsers() {
    const result = getUsers;
    return result.data.allUsers.map(function(item: any, i: number) {
      return <li key={i}>{item.email}</li>;
    });
  }
};

export default withApollo(ListUsers);
