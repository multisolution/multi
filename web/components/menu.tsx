import React, { FunctionComponent, MouseEvent } from "react";
import { Align, Row } from "./grid";

import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import redirect from "../lib/redirect";
import cookie from "cookie";
import { Role } from "../lib/models";
import { withApollo } from "../lib/apollo";

type MenuItem = {
  label: string;
  link: Function;
  role: Role;
};

const Menu: FunctionComponent = ({ children }) => {
  const meQuery = useQuery(
    gql`
      query meQuery {
        me {
          role
          email
          role
        }
      }
    `
  );

  const apolloClient = useApolloClient();
  const [signOut] = useMutation<{ signOut: boolean }>(gql`
    mutation SignOut {
      signOut
    }
  `);
  const menu: Array<MenuItem> = [
    {
      label: "Calendário",
      link: () => redirect(null, "/meeting-rooms"),
      role: Role.COLLABORATOR
    },
    {
      label: "Usuários",
      link: () => redirect(null, "/list-users"),
      role: Role.ADMINISTRATOR
    },
    {
      label: "Perfil",
      link: () => redirect(null, "/profile"),
      role: Role.COLLABORATOR
    },
    {
      label: "Sair",
      link: onSignOutClick,
      role: Role.COLLABORATOR
    }
  ];

  async function onSignOutClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    signOut().then(result => console.info("Back-end sign out", result.data));
    document.cookie = cookie.serialize("token", "", { maxAge: -1 });
    await apolloClient.cache.reset();
    redirect(null, "/signin");
  }

  function renderMenuItem(item: MenuItem) {
    // const meResult = await meQuery.data;
    // console.log(meResult);
    // if (meQuery.data.me.role == Role.COLLABORATOR && item.role == Role.ADMINISTRATOR) {
    //   return;
    // } else {
    //   return (
    //     <Button onClick={() => item.link} skin={ButtonSkin.Text}>
    //       {item.label}
    //     </Button>
    //   );
    // }
  }

  return (
    <>
      <Row mainAxis={Align.Center} crossAxis={Align.End}>
        {menu.map(item => renderMenuItem(item))}
      </Row>
    </>
  );
};

export default Menu;
