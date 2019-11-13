import { NextPage, NextPageContext } from "next";
import React from "react";
import { WithApollo, withApollo } from "../lib/apollo";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../components/layout";
import { Container, Section, ListElement } from "../components/global-style";
import { User } from "../lib/models";
import { Column, Row } from "../components/grid";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import TitlePage from "../components/title-page";


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
        <div key={index} style={{ display: "flex", margin: "flex-start", alignSelf: "center", flexDirection: "row", borderBottom: "2px solid #bad531",
        width: "100%", padding: "10px 0px", marginBottom: "0px", justifyContent: "space-between"}}>
          <ListElement>{user.id}</ListElement>
          <ListElement>{user.email}</ListElement>
          <ListElement>{user.role}</ListElement>

          {user.role !== "ADMINISTRATOR" && 
          <button style={{ color: "transparent", border: "none", marginRight: "20px" }} id={user.id} onClick={deleteUserClickHandler}>
            <img style={{ width: "20px" }} src="/assets/img/delete.svg" />
          </button>          }
        </div>
      ));
    }
  }
  
  return (
    <>

            <TitlePage style={{borderBottom: "2px solid #bad531"}}>Usuários</TitlePage>
            <Column>{renderTable()}</Column>
   
    </>
  );
};

export default ListUsers 

// ListUsers.getInitialProps = async (context: NextPageContext & WithApollo) => {
//   const user = await checkLoggedIn(context.apolloClient);

//   if (!user) {
//     redirect(context, "/signin");
//   }

//   return { user };
// };

// export default withApollo(ListUsers);
