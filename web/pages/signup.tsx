import { NextPage } from "next";
import React, { useRef } from "react";
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

  return (
    <>
      <Layout>
        <Section>
          <Container>
            <form name="form">
              <Column>
                <Input
                  type="text"
                  skin="dark"
                  placeholder="Email"
                  ref={email}
                />
                <Input
                  type="password"
                  skin="dark"
                  placeholder="Senha"
                  ref={pass}
                />
                <Input
                  type="password"
                  skin="dark"
                  placeholder="Confirmar senha"
                  ref={confirmpass}
                />
                <Button skin="black" onClick={validateForm}>
                  Cadastrar
                </Button>
              </Column>
            </form>
          </Container>
        </Section>
      </Layout>
    </>
  );

  function validateForm(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (validateEmail() && validatePass()) {
      console.log("Pass");
    }
  }

  function validateEmail() {
    if (email.current !== null) {
      if (emailRegex.test(String(email.current.value).toLocaleLowerCase())) {
        console.log("Émail ok");
        return true;
      } else {
        console.log("Émail inválido");
        return false;
      }
    }
  }
  function validatePass() {
    if (confirmpass.current !== null && pass.current !== null) {
      if (confirmpass.current === pass.current) {
        console.log("Senhas ok");
        return true;
      } else {
        console.log("As senhas não são iguais");
        return false;
      }
    }
  }
};

export default Signup;
