import React, { FunctionComponent, useRef, useState } from "react";
import styled from "styled-components";
import { Input } from "../components/form";
import Button from "./button";
import Loading from "./loading";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChangePassModal: FunctionComponent = () => {
  const pass = useRef<HTMLInputElement>(null);
  const confirmPass = useRef<HTMLInputElement>(null);
  const [passErrorMessage, setpassError] = useState("");

  if (pass.current && confirmPass.current) {
    pass.current.value = "";
    confirmPass.current.value = "";
  }
  return (
    <StyledContainer>
      <h2>Nova senha</h2>
      <div style={{ width: "100%" }}>
        <Input type="password" placeholder="Senha" ref={pass} />
      </div>
      <div style={{ width: "100%" }}>
        <Input type="password" placeholder="Confirmar senha" ref={confirmPass} />
      </div>
      <Button onClick={saveNewPass}>Alterar senha</Button>
      {renderError()}
    </StyledContainer>
  );

  function saveNewPass() {
    if (validatePass() && validateMinimumPassSize()) {
      // TODO MUTATION EDIT USER
      console.log("Senha salva com sucesso");
    }
  }

  function renderError() {
    return (
      <div>
        <b>{passErrorMessage}</b>
      </div>
    );
  }

  function validateMinimumPassSize() {
    if (confirmPass.current !== null) {
      if (confirmPass.current.value.length < 5) {
        setpassError("A senha deve ter ao menos 6 caracteres");
        return false;
      } else {
        setpassError("");
        return true;
      }
    }
  }

  function validatePass() {
    if (confirmPass.current !== null && pass.current !== null && validateMinimumPassSize()) {
      if (confirmPass.current.value === pass.current.value) {
        setpassError("");
        return true;
      } else {
        setpassError("As senhas devem ser iguais");
        return false;
      }
    }
  }
};

export default ChangePassModal;
