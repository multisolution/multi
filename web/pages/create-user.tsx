import { useMutation } from "@apollo/react-hooks";
import { NextPage, NextPageContext } from "next";
import React, { useRef, useState } from "react";
import Button from "../components/button";
import { Container, Section } from "../components/global-style";
import Layout from "../components/layout";
import { Input } from "../components/form";
import { Column } from "../components/grid";
import { WithApollo, withApollo } from "../lib/apollo";
import gql from "graphql-tag";
import { Role, User, UserInput } from "../lib/models";
import TitlePage from "../components/title-page";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import { margin } from "polished";
import styled from "styled-components"
import Modal from "../components/modal";
import ListUsers from "./list-users";


const Error = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.error};
  font-weight: bold;
`;

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
  const [formSuccessMessage, SetformSuccessMessage] = useState("");
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

  const [modal, setModal] = useState(false);
  // const [myFormRef, SetmyFormRef] = useState();
  const form = useRef<HTMLFormElement>(null);
  return (
    <>
      <Layout>
        <Section>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <Column>
              <ListUsers></ListUsers>
              <Button onClick={openModal} >Cadastrar usuário</Button>
            </Column>
          </Container>
        </Section>

        <Modal title="Novo usuário" isOpen={modal} onClose={() => setModal(false)}>
        <form name="form" ref={form}  style={{width: "100%"}}>
              <Column>
                <div style={{ width: "100%", position: "relative" }}>
                  <Input onChange={validateEmail} type="text" placeholder="Email" ref={email} style={{marginBottom: "5px", paddingRight: "40px"}} />
                  <img src={validEmail ? "assets/img/success_icon.svg" : ""} style={{ position: "absolute", right: "10px", top: "10px"}} />
                </div>
                <div style={{ width: "100%", position: "relative" }}>
                  <Input onChange={validatePass} type="password" placeholder="Senha" ref={pass} style={{marginBottom: "5px", paddingRight: "40px"}} />
                  <img src={validPass ? "assets/img/success_icon.svg" : ""} style={{ position: "absolute", right: "10px", top: "10px"}}/>
                </div>
                <div style={{ width: "100%", position: "relative" }}>
                  <Input onChange={validatePass} type="password" placeholder="Confirmar senha" ref={confirmpass} style={{marginBottom: "5px", paddingRight: "40px",}} />
                  <img src={validPass ? "assets/img/success_icon.svg" : ""} style={{ position: "absolute", right: "10px", top: "10px"}} />
                </div>
                <Button onClick={sendForm} >Cadastrar</Button>
                {renderError()}
                {renderSuccess()}
              </Column>
            </form>
        </Modal>
      </Layout>
    </>
  );

  function openModal(){
    setModal(true); 
  }

  function renderSuccess() {
    if (formSuccessMessage) {
      return (
        <Error>
        <br></br>
        {<b style={{color: "#bad531", fontSize: "17px"}}>{formSuccessMessage}</b>}
        </Error>
      )
    }
  }


  function renderError() {
    if (emailErrorMessage || passErrorMessage) {
      return (
        <Error>
        <br></br>
        {<b>{emailErrorMessage}</b>}
        {emailErrorMessage && <br/>}
        <b>{passErrorMessage}</b>
        </Error>
      )
    }
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

  function successForm(){
    SetformSuccessMessage("Usuario cadastrado com sucesso!")
    setPassValue("")
    setEmailValue("")

    console.log(form, form.current)


    setTimeout( function (){ 
 
        SetformSuccessMessage("") 
        setModal(false);
    
    },  2500)

    // setTimeout(function(){ alert("Hello"); }, 3000);
  }

  async function sendForm(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    validatePass();
    validateEmail();
    validateMinimumPassSize();

    if (validEmail && validPass) {
      successForm()
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

CreateUser.getInitialProps = async (context: NextPageContext & WithApollo) => {
  const user = await checkLoggedIn(context.apolloClient);

  if (!user) {
    redirect(context, "/signin");
  }

  return { user };
};

export default withApollo(CreateUser);
