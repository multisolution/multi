import React, {FunctionComponent, useRef, useState} from "react";
import Button, {ButtonSkin} from "../components/button";
import {Column} from "./grid";
import {Form, Input} from "./form";
import redirect from "../lib/redirect";
import styled from "styled-components";
import {FaLongArrowAltLeft} from "react-icons/fa/";
import {emailRegex} from "../lib/misc";

const FormContainer = styled(Column)`
  width: 40%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 0 40px;
  max-width: 600px;
  min-width: 460px;

  @media screen and (max-width: 700px) {
    width: 100%;
    min-width: auto;
    padding: 0 20px;
    margin: 0 10px;
  }
`;

const PasswordRecovery: FunctionComponent = () => {
  const email = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  return (
    <>
      <FormContainer>
        <Form
          onSubmit={e => {
            e.preventDefault();
            // sendRecoveryEmail();
          }}
        >
          <div style={{display: emailSent ? "none" : "flex", flexDirection: "column", position: "relative"}}>
            <div
              style={{
                paddingTop: "60px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginBottom: "10px"
              }}
            >
              <img src="/logo.png"/>
            </div>
            <Input type="text" placeholder="Email de cadastro" ref={email}/>

            <div style={{position: "relative", display: "flex"}}>
              <Button
                style={{width: "55px", position: "absolute", bottom: "0px"}}
                colorText="dark"
                skin={ButtonSkin.Text}
                onClick={() => {
                  setEmailSent(false);
                  redirect(null, "/signin");
                }}
              >
                <FaLongArrowAltLeft style={{fontSize: "22px", color: "#bad531", width: "20px"}}/>
              </Button>

              <Button style={{width: "100%"}} colorText="dark" skin={ButtonSkin.Text} onClick={sendRecoveryEmail}>
                Recuperar senha
              </Button>
            </div>
            <div style={{paddingBottom: "15px", paddingTop: "10px", textAlign: "center"}}>{renderError()}</div>
          </div>
          <div style={{display: emailSent ? "flex" : "none", flexDirection: "column"}}>
            <div
              style={{
                paddingTop: "60px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginBottom: "10px"
              }}
            >
              <img src="/logo.png"/>
            </div>
            <b style={{paddingTop: "10px", textAlign: "center"}}>
              Uma nova senha foi gerada e enviada para o email {email.current ? email.current.value : ""}
            </b>
            <Button
              colorText="dark"
              skin={ButtonSkin.Text}
              onClick={() => {
                setEmailSent(false);
                redirect(null, "/signin");
              }}
            >
              Voltar para login
            </Button>
            {/* <Button colorText="dark" skin=ButtonSkin.Text onClick={() => redirect(null, "/signin")}>
                    Voltar para login
                  </Button> */}
          </div>
        </Form>
      </FormContainer>
    </>
  );

  function renderError() {
    return <div>{message}</div>;
  }

  function sendRecoveryEmail(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (validateEmail()) {
      setEmailSent(true);
      console.log("recovery pass");
    }
  }

  function validateEmail() {
    if (email.current !== null) {
      if (!emailRegex.test(String(email.current.value).toLocaleLowerCase()) || email.current.value.length === 0) {
        setMessage("Email Inválido");
        return false;
      } else {
        setMessage("");
        return true;
      }
    }
  }
};
export default PasswordRecovery;
