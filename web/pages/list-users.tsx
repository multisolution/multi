import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { withApollo } from "../lib/apollo";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../components/layout";
import { Section, Container, UserListElement } from "../components/global-style";
import { User } from "../lib/models";
import { Column } from "../components/column";
const ListUsers: NextPage = () => {
  const [users, setUsers] = useState<[User]>();
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
  const deleteUser = useMutation(
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
  useEffect(() => {
    const result = getUsers;
    setUsers(result.data.allUsers);
  }, []);

  function deleteUserClickHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(event.currentTarget.id);
  }

  function renderTable() {
    if (users) {
      return users.map((user: User) => (
        <div
          key={users.indexOf(user)}
          style={{ display: "flex", margin: "flex-start", alignSelf: "center", flexDirection: "row" }}
        >
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
