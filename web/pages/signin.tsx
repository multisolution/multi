import {useApolloClient, useMutation} from "@apollo/react-hooks";
import {NextPage} from "next";
import React, {useRef, useState, useEffect} from "react";
import Button, { ButtonSkin } from "../components/button";
import gql from "graphql-tag";
import cookie from "cookie";
import redirect from "../lib/redirect";
import {withApollo} from "../lib/apollo";
import {Column} from "../components/grid";
import {Form, Input} from "../components/form";
import styled from "styled-components";
import PassRecovery from "./pass-recovery";
import FormMsg from "../components/form-msg";

const Signin: NextPage = () => {
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);
  const [errorMessage, setError] = useState("");
  const [formLogin, setFormLogin] = useState(true);

  const [sigin] = useMutation(gql`
    mutation Siginin($email: String!, $password: String!) {
      signIn(email: $email, password: $password)
    }
  `);

  const appoloClient = useApolloClient();

  const BoxHome = styled(Column)`
      width: 40%;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius:  10px;
      padding: 0 40px;
      max-width: 600px;
      min-width: 460px;
      height: auto;


      @media screen and (max-width: 700px){
        width: 100%;
        min-width: auto;
        padding: 0 20px;
        margin: 0 10px;

      }


  `


  return (
    <>
      <div style={{ backgroundSize: "cover", width: "100%", height: "100%", backgroundImage: "url(/assets/img/signin_bg.jpg)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>

          {formLogin === true ? 
              <BoxHome>
                
                <div style={{ paddingTop: "60px", display: "flex", justifyContent: "center", width: "100%" }}>
                  <img src="/assets/img/logo.png" />
                </div>

                <Form name="form">
                  <div>
                    <Input onChange={() => setError("")} type="text" placeholder="Email" ref={email} />
                  </div>
                  <div>
                    <Input onChange={() => setError("")} type="password" placeholder="Senha" ref={pass} />
                  </div>
                  <div>
                    <Button onClick={onSignInClick}>
                      Entrar
                    </Button>
                  </div>
                </Form>
                <Button colorText="dark" skin={ButtonSkin.Text} onClick={recoveryPass}>
                  Esqueci minha senha
                </Button>
                <FormMsg>
                  {renderError()}
                </FormMsg>
              </BoxHome>
            :
              <PassRecovery></PassRecovery>
              // <PassRecovery setFormLogin={()=> setFormLogin(true)} ></PassRecovery>
            }
        </div>
      </div>

     
    </>
  );

  function recoveryPass() {
    // redirect(null, "/pass-recovery");
    setFormLogin(false);
  }

  function renderError() {
    return <div>{errorMessage}</div>;
  }

  function validatePass() {
    if (pass.current !== null) {
      if (pass.current.value.length === 0) {
        setError("A senha é obrigatória");
        return false;
      } else {
        setError("");
        return true;
      }
    }
  }

  function validateEmail() {
    if (email.current !== null) {
      if (!emailRegex.test(String(email.current.value).toLocaleLowerCase()) || email.current.value.length === 0) {
        setError("Email Inválido");
        return false;
      } else {
        setError("");
        return true;
      }
    }
  }

  async function onSignInClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (validateEmail() && validatePass()) {
      try {
        const result = await sigin({
          variables: {
            email: email.current !== null ? email.current.value : "",
            password: pass.current !== null ? pass.current.value : ""
          }
        });

        if (result.data && result.data.signIn) {
          document.cookie = cookie.serialize("token", result.data.signIn);
          console.log(document.cookie);
          await appoloClient.cache.reset();
          redirect(null, "/create-user");
        }
      } catch (error) {
        // TODO: Handle error
        console.error(error["message"]);
      }
    }
  }
};

export default withApollo(Signin);
