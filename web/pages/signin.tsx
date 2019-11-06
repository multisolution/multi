import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import Button from "../components/button";
import gql from "graphql-tag";
import cookie from "cookie";
import redirect from "../lib/redirect";
import { withApollo } from "../lib/apollo";
import { Column } from "../components/column";
import Input from "../components/input";

const Signin: NextPage = () => {
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);
  const [errorMessage, setError] = useState("");

  const [sigin] = useMutation(gql`
    mutation Siginin($email: String!, $password: String!) {
      signIn(email: $email, password: $password)
    }
  `);

  const appoloClient = useApolloClient();

  return (
    <>
      <div style={{ backgroundSize: "cover", width: "100%", height: "100%", backgroundImage: "url(/signin_bg.jpg)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              width: "40%",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              marginTop: "100px",
              borderRadius: "10px"
            }}
          >
            <div style={{ paddingTop: "60px", display: "flex", justifyContent: "center" }}>
              <img src="/logo.png" />
            </div>
            <div style={{ margin: "40px" }}>
              <Column>
                <form name="form">
                  <div>
                    <Input onChange={() => setError("")} type="text" placeholder="Email" ref={email} />
                  </div>
                  <div>
                    <Input onChange={() => setError("")} type="password" placeholder="Senha" ref={pass} />
                  </div>
                  <div>
                    <Button skin="primary" onClick={onSignInClick}>
                      Entrar
                    </Button>
                  </div>
                </form>
                <Button colorText="dark" skin="transparent" onClick={recoveryPass}>
                  Esqueci minha senha
                </Button>
                {renderError()}
              </Column>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </>
  );

  function recoveryPass() {
    redirect(null, "/pass-recovery");
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
