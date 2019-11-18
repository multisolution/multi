import React, { FunctionComponent, MouseEvent } from "react";
import { Align, Row } from "./grid";

import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import redirect from "../lib/redirect";
import cookie from "cookie";
import { Role, User } from "../lib/models";
import Button, { ButtonSkin } from "./button";

type MenuItem = {
  label: string;
  link: Function;
  role: Role;
};

type MenuProps = {
  user: User;
};

const Menu: FunctionComponent<MenuProps> = ({ user }) => {
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
      link: () => redirect(null, "/create-user"),
      role: Role.ADMINISTRATOR
    },
    {
      label: "Minhas reuniões",
      link: () => redirect(null, "/my-meetings"),
      role: Role.COLLABORATOR
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
    signOut().then(result => console.info("Back-end sign out", result.data));
    document.cookie = cookie.serialize("token", "", { maxAge: -1 });
    await apolloClient.cache.reset();
    redirect(null, "/signin");
  }

  function renderMenuItem(item: MenuItem) {
    if (user.role == Role.COLLABORATOR && item.role == Role.ADMINISTRATOR) {
      return;
    } else {
      return (
        <Button key={menu.indexOf(item) + "menu-item"} onClick={() => item.link()} skin={ButtonSkin.Text}>
          {item.label}
        </Button>
      );
    }
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
