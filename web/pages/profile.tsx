import { NextPage, NextPageContext } from "next";
import React, { useState, useRef } from "react";
import Layout from "../components/layout";
import { withApollo, WithApollo } from "../lib/apollo";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Whoops from "../components/whoops";
import Loading from "../components/loading";
import { Column } from "../components/grid";
import Button from "../components/button";
import { UserInput, Role, User } from "../lib/models";
import { css } from "styled-components";
import { Input } from "../components/form";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import { TitlePage } from "../components/global-style";

type ProfileProps = {
  user: User;
};

const Profile: NextPage<ProfileProps> = ({ user }) => {
  const pass = useRef<HTMLInputElement>(null);
  const confirmPass = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [updateUser] = useMutation<{ updateUser: Boolean }, { userInput: UserInput }>(
    gql`
      mutation CreateUser($userInput: UserInput!) {
        updateUser(userInput: $userInput)
      }
    `
  );

  const meQuery = useQuery(
    gql`
      query me {
        me {
          id
          email
          role
        }
      }
    `
  );

  if (meQuery.error || (meQuery.data === undefined && !meQuery.loading)) {
    console.error("Error querying ME");
    return <Whoops />;
  }

  if (meQuery.loading || meQuery.data === undefined) {
    return <Loading />;
  }

  function errorField() {
    return <span>{error}</span>;
  }

  async function updateClickHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (validateEmail() && validatePass() && validateMinimumPassSize()) {
      if (email.current && pass.current && confirmPass.current) {
        const result = await updateUser({
          variables: {
            userInput: {
              email: email.current.value,
              password: pass.current.value,
              id: meQuery.data.me.id,
              role: meQuery.data.me.role
            }
          }
        });
        if (result.data && result.data.updateUser) {
          console.log("atualizou a parada");
          pass.current.value = "";
          confirmPass.current.value = "";
          email.current.value = "";
          meQuery.refetch();
          setError("Dados atualizados com sucesso");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      }
    }
  }

  function validatePass() {
    if (confirmPass.current !== null && pass.current !== null) {
      if (confirmPass.current.value === pass.current.value) {
        setError("");
        return true;
      } else {
        setError("As senhas não coincidem");
        return false;
      }
    }
  }

  function validateMinimumPassSize() {
    if (confirmPass.current !== null && pass.current !== null) {
      if (confirmPass.current.value.length < 5) {
        setError("A senha deve ter ao menos 6 caracteres");
        return false;
      } else {
        setError("");
        return true;
      }
    }
  }
  function validateEmail() {
    if (email.current) {
      if (email.current.value.length == 0) {
        console.log("email não modificado");
        email.current.value = meQuery.data.me.email;
      }

      if (emailRegex.test(String(email.current.value).toLocaleLowerCase())) {
        setError("");
        return true;
      } else {
        setError("Email inválido");
        return false;
      }
    }
  }

  return (
    <Layout user={user}>
      <div style={{ paddingTop: "100px", display: "flex", justifyContent: "center" }}>
        <Column
          decoration={css`
            width: 40%;
          `}
        >
          <TitlePage>Atualize seus dados</TitlePage>
          <Input type="text" placeholder={meQuery.data.me.email} ref={email} />
          <Input type="password" placeholder="Nova senha" ref={pass} />
          <Input type="password" placeholder="Confirmar nova senha" ref={confirmPass} />
          <Button onClick={updateClickHandler}>Atualizar dados</Button>
          {errorField()}
        </Column>
      </div>
    </Layout>
  );
};

Profile.getInitialProps = async (context: NextPageContext & WithApollo) => {
  const user = await checkLoggedIn(context.apolloClient);

  if (!user) {
    redirect(context, "/signin");
    return {
      user: {
        id: "",
        email: "",
        role: Role.ADMINISTRATOR
      }
    };
  }

  return { user };
};

export default withApollo(Profile);
