import React, {FunctionComponent} from "react";
import Link from "next/link";
import {Align, Row} from "./grid";
import Button, {ButtonSkin} from "./button";

const BoxHeader: FunctionComponent = () => {
  return (
    <Row mainAxis={Align.Center} crossAxis={Align.End}>
      <span>Usuário/Admin</span>

      <Link href="/meeting-rooms">
        <Button skin={ButtonSkin.Text}>Calendario</Button>
      </Link>

      <Link href="/create-user">
        <Button skin={ButtonSkin.Text}>Cadastrar Usuário</Button>
      </Link>

      <Link href="/index">
        <Button skin={ButtonSkin.Text}>Perfil</Button>
      </Link>

      <Button skin={ButtonSkin.Text}>Sair</Button>
    </Row>
  );
};

export default BoxHeader;
