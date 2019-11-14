import { useMutation, useQuery } from "@apollo/react-hooks";
import { NextPage, NextPageContext } from "next";
import React, { useRef, useState } from "react";
import Button from "../components/button";
import { Container, Section, ListElement } from "../components/global-style";
import Layout from "../components/layout";
import { Input } from "../components/form";
import { Column } from "../components/grid";
import { WithApollo, withApollo } from "../lib/apollo";
import gql from "graphql-tag";
import { Role, User, UserInput } from "../lib/models";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import styled from "styled-components";
import Modal from "../components/modal";
import ListUsers from "../components/list-users";
import AlertMenssage from "../components/alert-menssage";

const Error = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.error};
  font-weight: bold;
`;
type CreateUserProps = {
  user: User;
};
const CreateUser: NextPage<CreateUserProps> = ({ user }) => {
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);
  const confirmpass = useRef<HTMLInputElement>(null);
  const [validEmail, setValidEmail] = useState(false);
  const [passValue, setPassValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [emailErrorMessage, setEmailError] = useState("");
  const [formSuccessMessage, SetformSuccessMessage] = useState(false);
  const [passErrorMessage, setpassError] = useState("");
  const [modal, setModal] = useState(false);
  const [createUser] = useMutation<{ createUser: User }, { input: UserInput }>(
    gql`
      mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
          id
        }
      }
    `
  );

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

  console.log(getUsers.data);

  function renderTable() {
    if (getUsers.data) {
      return getUsers.data.allUsers.map((user: User, index: number) => (
        <div
          key={index}
          style={{
            display: "flex",
            margin: "flex-start",
            alignSelf: "center",
            flexDirection: "row",
            borderBottom: "2px solid #bad531",
            width: "100%",
            padding: "10px 0px",
            marginBottom: "0px",
            justifyContent: "space-between"
          }}
        >
          <ListElement>{user.id}</ListElement>
          <ListElement>{user.email}</ListElement>
          <ListElement>{user.role}</ListElement>

          {user.role !== "ADMINISTRATOR" && (
            <button
              style={{ color: "transparent", border: "none", marginRight: "20px" }}
              id={user.id}
              onClick={deleteUserClickHandler}
            >
              <img style={{ width: "20px" }} src="/assets/img/delete.svg" />
            </button>
          )}
        </div>
      ));
    }
  }

  const form = useRef<HTMLFormElement>(null);
  return (
    <>
      <Layout user={user}>
        <Section>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <Column>
            <Button onClick={openModal}>Cadastrar usuário</Button>
              <Column>{renderTable()}</Column>
            </Column>
          </Container>
        </Section>
        <Modal title="Novo usuário" isOpen={modal} onClose={() => setModal(false)}>
          <form name="form" ref={form} style={{ width: "100%" }}>
            <Column>
              <div style={{ width: "100%", position: "relative" }}>
                <Input
                  onChange={validateEmail}
                  type="text"
                  placeholder="Email"
                  ref={email}
                  style={{ marginBottom: "5px", paddingRight: "40px" }}
                />
                <img
                  src={validEmail ? "assets/img/success_icon.svg" : ""}
                  style={{ position: "absolute", right: "10px", top: "10px" }}
                />
              </div>
              <div style={{ width: "100%", position: "relative" }}>
                <Input
                  onChange={validatePass}
                  type="password"
                  placeholder="Senha"
                  ref={pass}
                  style={{ marginBottom: "5px", paddingRight: "40px" }}
                />
                <img
                  src={validPass ? "assets/img/success_icon.svg" : ""}
                  style={{ position: "absolute", right: "10px", top: "10px" }}
                />
              </div>
              <div style={{ width: "100%", position: "relative" }}>
                <Input
                  onChange={validatePass}
                  type="password"
                  placeholder="Confirmar senha"
                  ref={confirmpass}
                  style={{ marginBottom: "5px", paddingRight: "40px" }}
                />
                <img
                  src={validPass ? "assets/img/success_icon.svg" : ""}
                  style={{ position: "absolute", right: "10px", top: "10px" }}
                />
              </div>
              <Button onClick={sendForm}>Cadastrar</Button>
              {renderError()}
            </Column>
          </form>
        </Modal>
      </Layout>


      {renderMenssage()}
    </>
  );

  function openModal() {
    setModal(true);
  }

  function renderMenssage() {

      return (
        <AlertMenssage title={"CADASTRADO COM SUCESSO!"} menssage="" typeMenssage="success" isOpen={formSuccessMessage}  />
      );

  }

  function renderError() {
    if (emailErrorMessage || passErrorMessage) {
      return (
        <Error>
          <br></br>
          {<b>{emailErrorMessage}</b>}
          {emailErrorMessage && <br />}
          <b>{passErrorMessage}</b>
        </Error>
      );
    }
  }


  function successForm() {
    SetformSuccessMessage(true);
    setPassValue("");
    setEmailValue("");
    setModal(false);

    console.log(form, form.current);

    // setTimeout(function() {
    //   SetformSuccessMessage(false);
    // }, 2500);
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
      successForm();
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
      if (result.data) {
        getUsers.refetch();
      }
    }
  }
};

CreateUser.getInitialProps = async (context: NextPageContext & WithApollo) => {
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

export default withApollo<CreateUserProps>(CreateUser);
