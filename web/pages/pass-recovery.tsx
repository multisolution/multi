import { NextPage } from "next";
import React, { useRef, useState } from "react";
import Button from "../components/button";
import { Container, Section } from "../components/global-style";
import Layout from "../components/layout";
import { Column } from "../components/column";
import Input from "../components/input";
import redirect from "../lib/redirect";

const PassRecovery: NextPage = () => {
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = useRef<HTMLInputElement>(null);
  const [message, SetMessage] = useState("");
  const [emailSended, setSended] = useState(false);

  return (
    <>
      <Layout>
        <Section>
          <Container>
            <form>
              <div style={{ display: emailSended ? "none" : "flex" }}>
                <Column>
                  <Input type="text" placeholder="Email de cadastro" ref={email} />
                  <Button colorText="dark" skin="transparent" onClick={sendRecoveryEmail}>
                    Recuperar senha
                  </Button>
                  {renderError()}
                </Column>
              </div>
              <div style={{ display: emailSended ? "flex" : "none" }}>
                <b>Uma nova senha foi gerada e enviada para o email {email.current ? email.current.value : ""}</b>
                <Button colorText="dark" skin="transparent" onClick={() => redirect(null, "/signin")}>
                  Voltar para login
                </Button>
              </div>
            </form>
          </Container>
        </Section>
      </Layout>
    </>
  );

  function renderError() {
    return <div>{message}</div>;
  }

  function sendRecoveryEmail(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (validateEmail()) {
      setSended(true);
      console.log("recovery pass");
    }
  }

  function validateEmail() {
    if (email.current !== null) {
      if (!emailRegex.test(String(email.current.value).toLocaleLowerCase()) || email.current.value.length === 0) {
        SetMessage("Email Inválido");
        return false;
      } else {
        SetMessage("");
        return true;
      }
    }
  }
};
export default PassRecovery;
