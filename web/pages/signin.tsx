import {useApolloClient, useMutation} from "@apollo/react-hooks";
import {NextPage, NextPageContext} from "next";
import React, {FormEvent, useState} from "react";
import Button, {ButtonSkin} from "../components/button";
import gql from "graphql-tag";
import cookie from "cookie";
import redirect from "../lib/redirect";
import {WithApollo, withApollo} from "../lib/apollo";
import {Column} from "../components/grid";
import {Input} from "../components/form";
import styled from "styled-components";
import PasswordRecovery from "../components/password-recovery";
import checkLoggedIn from "../lib/check-logged-in";

const SignInPage = styled.div`
  background: url(/assets/img/signin_bg.jpg) no-repeat center;
  background-size: cover;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled(Column)`
  width: 40%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: ${props => props.theme.space * 8}px ${props => props.theme.space * 12}px;
  max-width: 600px;
  min-width: 460px;
  align-items: center;

  button {
    width: 100%;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    min-width: auto;
    padding: 0 20px;
    margin: 0 10px;
  }
`;

const Error = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.error};
  font-weight: bold;
`;

const SignIn: NextPage = () => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [error, setError] = useState("");
  const [formLogin, setFormLogin] = useState(true);
  const apolloClient = useApolloClient();

    const [signIn, {loading}] = useMutation(gql`
      mutation SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
      }
    `);




  function recoveryPass() {
    setFormLogin(false);
  }

  function renderError() {
    if (error) {
      return <Error>{error}</Error>;
    }
  }

  function validatePassword(password: string | File | null): boolean {
    if (password === null || password instanceof File || password.trim().length === 0) {
      setError("Preencha uma senha");
      return false;
    }

    return true;
  }

  function validateEmail(email: string | File | null): boolean {
    if (email === null || email instanceof File || email.trim().length === 0) {
      setError("Preencha um e-mail");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("E-mail inválido");
      return false;
    }

    return true;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (validateEmail(email) && validatePassword(password)) {
      try {
        const result = await signIn({
          variables: {email, password}
        });

        if (result.errors) {
          return setError(result.errors[0].message);
        }

        if (result.data && result.data.signIn) {
          document.cookie = cookie.serialize("token", result.data.signIn);
          await apolloClient.cache.reset();
          redirect(null, "/meeting-rooms");
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
  }

  return (
    <SignInPage>
      {formLogin ? (
        <FormContainer>
          <div>
            <img src="/assets/img/logo.png" alt="MultisolutiON"/>
          </div>

          <form onSubmit={onSubmit} style={{width: '100%'}}>
            <Column>
              <Input onChange={() => setError("")} type="email" placeholder="Email" name="email"/>
              <Input onChange={() => setError("")} type="password" placeholder="Senha" name="password"/>
              <Button type="submit" isLoading={loading}>
                Entrar
              </Button>
            </Column>
          </form>

          <Button colorText="dark" skin={ButtonSkin.Text} onClick={recoveryPass}>
            Esqueci minha senha
          </Button>

          {renderError()}
        </FormContainer>
      ) : (
        <PasswordRecovery/>
      )}
    </SignInPage>
  );
};

SignIn.getInitialProps = async (context: NextPageContext & WithApollo) => {
  const user = await checkLoggedIn(context.apolloClient);

  if (user) {
    redirect(context, '/meeting-rooms');
  }

  return {};
};

export default withApollo(SignIn);
