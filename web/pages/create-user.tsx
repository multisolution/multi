import {useMutation} from "@apollo/react-hooks";
import {NextPage} from "next";
import React, {useRef, useState} from "react";
import Button from "../components/button";
import {Container, Section} from "../components/global-style";
import Layout from "../components/layout";
import {Input} from "../components/form";
import {Column} from "../components/grid";
import {withApollo} from "../lib/apollo";
import gql from "graphql-tag";
import {Role, User, UserInput} from "../lib/models";

const CreateUser: NextPage = () => {
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);
  const confirmpass = useRef<HTMLInputElement>(null);
  const [validEmail, setValidEmail] = useState(false);
  const [passValue, setPassValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [emailErrorMessage, setEmailError] = useState("");
  const [passErrorMessage, setpassError] = useState("");
  const [createUser] = useMutation<{ createUser: User }, { input: UserInput }>(
    gql`
      mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
          id
        }
      }
    `
  );

  return (
    <>
      <Layout>
        <Section>
          <Container>
            <form name="form">
              <Column>
                <div>
                  <Input onChange={validateEmail} type="text" placeholder="Email" ref={email} />
                  <img src={validEmail ? "success_icon.svg" : "error_icon.svg"} />
                </div>
                <div>
                  <Input onChange={validatePass} type="password" placeholder="Senha" ref={pass} />
                  <img src={validPass ? "success_icon.svg" : "error_icon.svg"} />
                </div>
                <div>
                  <Input onChange={validatePass} type="password" placeholder="Confirmar senha" ref={confirmpass} />
                  <img src={validPass ? "success_icon.svg" : "error_icon.svg"} />
                </div>
                <Button skin="primary" onClick={sendForm}>
                  Cadastrar
                </Button>
              </Column>
            </form>
            {renderError()}
          </Container>
        </Section>
      </Layout>
    </>
  );

  function renderError() {
    return (
      <div>
        <b>{emailErrorMessage} </b>
        <br></br>
        <b>{passErrorMessage}</b>
      </div>
    );
  }

  function validateEmail() {
    if (email.current !== null) {
      if (emailRegex.test(String(email.current.value).toLocaleLowerCase())) {
        setEmailError("");
        setEmailValue(email.current.value);
        setValidEmail(true);
      } else {
        setEmailValue("");
        setEmailError("Email inválido");
        setValidEmail(false);
      }
    }
  }

  function validatePass() {
    if (confirmpass.current !== null && pass.current !== null && validateMinimumPassSize()) {
      if (confirmpass.current.value === pass.current.value) {
        setpassError("");
        setPassValue(confirmpass.current.value);
        setValidPass(true);
      } else {
        setPassValue("");
        setpassError("As senhas não coincidem");
        setValidPass(false);
      }
    }
  }

  function validateMinimumPassSize() {
    if (confirmpass.current !== null) {
      if (confirmpass.current.value.length < 5) {
        setpassError("A senha deve ter ao menos 6 caracteres");
        return false;
      } else {
        setpassError("");
        return true;
      }
    }
  }
  async function sendForm(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    validatePass();
    validateEmail();
    validateMinimumPassSize();

    if (validEmail && validPass) {
      console.log("Pass");
      const result = await createUser({
        variables: {
          input: {
            email: emailValue,
            password: passValue,
            role: Role.COLLABORATOR
          }
        }
      });
      console.log(result);
    }
  }
};

export default withApollo(CreateUser);