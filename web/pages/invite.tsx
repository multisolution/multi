import {NextPage, NextPageContext} from "next";
import {withApollo, WithApollo} from "../lib/apollo";
import React, {FormEvent} from "react";
import gql from "graphql-tag";
import Whoops from "../components/whoops";
import styled from "styled-components";
import {Column} from "../components/grid";
import {Input} from "../components/form";
import {useMutation} from "@apollo/react-hooks";
import {User, UserInput} from "../lib/models";
import Button from "../components/button";
import redirect from "../lib/redirect";

type InviteProps = {
  inviteCode?: string;
  inviteError?: string;
};

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  h1 {
    font-size: 18px;
  }

  p {
    margin-bottom: 16px;
  }

  form {
    width: 35vw;
  }
`;

const Invite: NextPage<InviteProps> = ({inviteCode, inviteError}) => {
    const [createUser, {error, loading, data}] = useMutation<{ createUser: User }, { input: UserInput }>(gql`
      mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
          id
        }
      }
    `);

  if (inviteError) {
    console.error(inviteError);
    return <Whoops/>;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      return;
    }

    const result = await createUser({
      variables: {
        input: {
          email,
          password,
          inviteCode
        }
      }
    });
  }

  if (data && data.createUser && data.createUser.id) {
    redirect(null, '/signin');
  }

  return (
    <Styled>
      <h1>Você recebeu um convite para participar do MULTI</h1>
      <p>Faça seu cadastro no formulário abaixo</p>
      <form onSubmit={onSubmit}>
        <Column>
          <Input type="email" name="email"/>
          <Input type="password" name="password"/>
          <Button type="submit" isLoading={loading}>CADASTRAR</Button>
        </Column>
      </form>
      {error && <p>{error.message}</p>}
    </Styled>
  );
};

Invite.getInitialProps = async (context: NextPageContext & WithApollo) => {
  const code = context.query["code"];

    try {
        const inviteQuery = await context.apolloClient.query({
            query: gql`
              query Invite($code: String!) {
                invite(code: $code) {
                  from {
                    email
                  }
                }
              }
            `,
          variables: {
            code
          }
        });

      return {inviteCode: Array.isArray(code) ? code[0] : code};
    } catch (inviteError) {
      console.error(inviteError);
      return {inviteError};
    }
};

export default withApollo(Invite);
