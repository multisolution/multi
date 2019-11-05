import { NextPage } from "next";
import React, { useRef, useState } from "react";
import Button from "../components/button";
import { Container, Section } from "../components/global-style";
import Layout from "../components/layout";
import Input from "../components/input";
import { Column } from "../components/column";

const Signup: NextPage = () => {
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);
  const confirmpass = useRef<HTMLInputElement>(null);
  const [validEmail, setValidEmail] = useState(false);
  const [validPass, setValidPass] = useState(false);

  return (
    <>
      <Layout>
        <Section>
          <Container>
            <form name="form">
              <Column>
                <div>
                  <Input
                    onChange={onEmailChange}
                    type="text"
                    placeholder="Email"
                    ref={email}
                  />
                  <img
                    src={validEmail ? "success_icon.svg" : "error_icon.svg"}
                  />
                </div>
                <div>
                  <Input
                    onChange={onPassChange}
                    type="password"
                    placeholder="Senha"
                    ref={pass}
                  />
                  <img
                    src={validPass ? "success_icon.svg" : "error_icon.svg"}
                  />
                </div>
                <div>
                  <Input
                    onChange={onPassChange}
                    type="password"
                    placeholder="Confirmar senha"
                    ref={confirmpass}
                  />
                  <img
                    src={validPass ? "success_icon.svg" : "error_icon.svg"}
                  />
                </div>
                <Button skin="primary" onClick={sendForm}>
                  Cadastrar
                </Button>
              </Column>
            </form>
          </Container>
        </Section>
      </Layout>
    </>
  );

  function onEmailChange() {
    if (email.current !== null) {
      if (emailRegex.test(String(email.current.value).toLocaleLowerCase())) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    }
  }

  function onPassChange() {
    if (confirmpass.current !== null && pass.current !== null) {
      if (
        confirmpass.current.value === pass.current.value &&
        pass.current.value.length > 5
      ) {
        setValidPass(true);
      } else {
        setValidPass(false);
      }
    }
  }
  function sendForm(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (validEmail && validPass) {
      console.log("Pass");
    }
  }
};

export default Signup;
