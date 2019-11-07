import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { withApollo } from "../lib/apollo";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../components/layout";
import { Section, Container, UserListElement } from "../components/global-style";
import { User } from "../lib/models";
import { Column } from "../components/grid";

const ListUsers: NextPage = () => {
  const getUsers = useQuery(
    gql`
      query AllUsers {
        allUsers {
          id
          email
          role
        }
      }
    `
  );

  const [deleteUser] = useMutation(
    gql`
      mutation DeleteUser($id: ID!) {
        deleteUser(userId: $id)
      }
    `
  );

  async function deleteUserClickHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const result = await deleteUser({
      variables: {
        id: event.currentTarget.id
      }
    });
    if (result.data.deleteUser) {
      getUsers.refetch();
      //   setUsers(result.data.allUsers);
    }
  }

  function renderTable() {
    if (getUsers.data) {
      return getUsers.data.allUsers.map((user: User, index: number) => (
        <div key={index} style={{ display: "flex", margin: "flex-start", alignSelf: "center", flexDirection: "row" }}>
          <UserListElement>{user.id}</UserListElement>
          <UserListElement>{user.email}</UserListElement>
          <UserListElement>{user.role}</UserListElement>
          <button style={{ color: "transparent", border: "none" }} id={user.id} onClick={deleteUserClickHandler}>
            <img style={{ width: "20px" }} src="/delete.svg" />
          </button>
        </div>
      ));
    }
  }

  return (
    <>
      <Layout>
        <Section>
          <Container>
            <Column>{renderTable()}</Column>
          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default withApollo(ListUsers);
