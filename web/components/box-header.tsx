import React from "react";
import styled from "styled-components";
import Link from "next/link";

const ContainerUsersBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  button {
    border: none;
    outline: none;
    font-weight: bold;
    font-size: 16px;
    background: none;

    &:hover {
      color: #bad531;
      cursor: pointer;
    }
  }
`;
const BoxHeader = () => {
  return (
    <ContainerUsersBox>
      <UserBox>
        <span>Usuário/Admin</span>
      </UserBox>

      <UserBox>
        <Link href="/meeting-rooms">
          <button>Calendario</button>
        </Link>
      </UserBox>
      <UserBox>
        <Link href="/create-user">
          <button>Cadastrar Usuário</button>
        </Link>
      </UserBox>

      <UserBox>
        <Link href="/index">
          <button>Perfil</button>
        </Link>
      </UserBox>

      <UserBox>
        <button>Sair</button>
      </UserBox>
    </ContainerUsersBox>
  );
};

export default BoxHeader;
